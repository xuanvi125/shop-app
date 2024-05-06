const User = require("../models/User.model");
const Book = require("../models/Book.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
exports.getCartItems = catchAsync(async (req, res, next) => {
  const cart = await User.findById(req.user.id).select("cart").populate({
    path: "cart.product",
    select: "name price image",
  });

  res.status(200).json({
    status: "success",
    result: cart.cart.length,
    data: cart.cart,
  });
});

exports.addCartItems = catchAsync(async (req, res, next) => {
  const { quantity = 1, productID } = req.body;
  let { cart } = req.user;
  const product = cart.find((item) => item.product == productID);
  if (product) {
    product.quantity += quantity;
  } else {
    cart.push({ product: productID, quantity });
  }
  req.user.cart = cart;

  await req.user.save({ validateBeforeSave: false });
  cart = await User.findById(req.user._id).select("cart").populate({
    path: "cart.product",
    select: "name price image",
  });

  res.status(200).json({
    status: "success",
    result: cart.length,
    data: cart,
  });
});

exports.updateCartItems = catchAsync(async (req, res, next) => {
  const { id: productID } = req.params;
  const { quantity = 1 } = req.body;
  const book = await Book.findById(productID);
  if (book.inventory < quantity) {
    return next(new AppError("Not enough product in inventory", 400));
  }
  let { cart } = req.user;
  const product = cart.find((item) => item.product == productID);
  if (product) {
    product.quantity = quantity;
  } else {
    return next(new AppError("Cannot found this product in your cart", 400));
  }
  req.user.cart = cart;
  await req.user.save({ validateBeforeSave: false });
  cart = await User.findById(req.user._id).select("cart").populate({
    path: "cart.product",
    select: "name price image",
  });
  res.status(200).json({
    status: "success",
    result: cart.length,
    data: cart,
  });
});

exports.deleteCartItems = catchAsync(async (req, res, next) => {
  const { id: productID } = req.params;
  const carts = req.user.cart;
  const product = carts.find((item) => item.product._id == productID);
  if (product) {
    req.user.cart = carts.filter((item) => item.product._id != productID);
  } else {
    return next(new AppError("Cannot found this product in your cart", 400));
  }
  await req.user.save({ validateBeforeSave: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.deleteAllCartItems = catchAsync(async (req, res, next) => {
  req.user.cart = [];
  await req.user.save();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
