const factory = require("../utils/handleFactory");
const Account = require("../models/Account.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Order = require("../models/Order.model");
const User = require("../models/User.model");
const { ADMIN_ACCOUNT } = require("../config/app.config.json");
const mongoose = require("mongoose");
exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.pay = catchAsync(async (req, res, next) => {
  const { accountNumber, shippingAddress } = req.body;
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const { cart } = await User.findById(req.user._id)
        .select("cart")
        .populate({ path: "cart.product", select: "price" });

      if (cart.length == 0) {
        return next(new AppError("cart is empty", 400));
      }

      const total = cart.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
      const orderedProducts = cart.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      });

      const userAccount = await Account.findOne({
        user: req.user._id,
        accountNumber,
      });
      if (!userAccount) {
        return next(new AppError("account not belong to this user", 400));
      }
      if (userAccount.balance < total) {
        return next(new AppError("total payment greater than balance", 400));
      }
      await User.updateOne({ _id: req.user._id }, { cart: [] }, { session });
      await Account.updateOne(
        { user: req.user._id },
        { $inc: { balance: -total } },
        { session }
      );

      await Account.findOneAndUpdate(
        { accountNumber: ADMIN_ACCOUNT.toString() },
        {
          $inc: { balance: total },
        },
        { session }
      );
      await Order.create(
        [
          {
            user: req.user._id,
            orderedProducts,
            shippingAddress,
            total,
          },
        ],
        { session }
      );
    });

    await session.commitTransaction();
    res.status(200).json({
      status: "success",
      message: "pay successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new AppError("payment failed", 400));
  } finally {
    await session.endSession();
  }
});

exports.getAllAccount = factory.getAll(Account, {
  path: "user",
  select: "name email",
});
exports.getAccount = factory.getOne(Account, {
  path: "user",
  select: "name email",
});
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
exports.createAccount = factory.createOne(Account);
