const factory = require("../utils/handleFactory");
const Book = require("../models/Book.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { uploadCloudProduct } = require("../utils/multerConfig");

exports.uploadBookImage = uploadCloudProduct.single("image");

exports.setCategoryID = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryID;
  next();
};

exports.setTopLowStock = (req, res, next) => {
  req.query.inventory = { lte: "50" };
  req.query.sort = "inventory";
  next();
};
exports.getTotalBook = catchAsync(async (req, res, next) => {
  const totalProduct = await Book.countDocuments({});
  res.status(200).json({
    status: "success",
    data: {
      totalProduct,
    },
  });
});
exports.getAllBook = factory.getAll(Book, {
  path: "category",
});
exports.getBook = factory.getOne(Book, {
  path: "category",
});
exports.createBook = factory.createOne(Book);
exports.updateBook = factory.updateOne(Book);
exports.deleteBook = factory.deleteOne(Book);
