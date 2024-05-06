const User = require("../models/User.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { uploadCloudUser } = require("../utils/multerConfig");
const factory = require("../utils/handleFactory");
exports.uploadAvatar = uploadCloudUser.single("image");

const filterObject = (object, ...acceptField) => {
  const newObject = {};
  Object.keys(object).map((key) => {
    if (acceptField.includes(key)) {
      newObject[key] = object[key];
    }
  });
  return newObject;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (
    req.body.password ||
    req.body.confirmPassword ||
    req.body.currentPassword
  ) {
    return next(
      new AppError("update password please go to route /update-password", 400)
    );
  }
  const filterBody = filterObject(req.body, "name", "cart");
  if (req.file) filterBody.image = req.file.path;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.getTotalUsers = catchAsync(async (req, res, next) => {
  const totalUsers = await User.countDocuments({});
  res.status(200).json({
    status: "success",
    data: totalUsers,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
