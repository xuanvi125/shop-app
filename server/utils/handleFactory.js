const catchAsyn = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const APIFeature = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  catchAsyn(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document with that id", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsyn(async (req, res, next) => {
    if (req.file) req.body.image = req.file.path;
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedDoc) {
      return next(new AppError("No document with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: updatedDoc,
    });
  });

exports.createOne = (Model) =>
  catchAsyn(async (req, res, next) => {
    if (req.file) req.body.image = req.file.path;
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsyn(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No document with that id ", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsyn(async (req, res, next) => {
    let filter = {};
    if (req.params.categoryID) filter = { category: req.params.categoryID };
    if (req.params.bookId) filter = { book: req.params.bookId };
    let query = Model.find(filter);
    if (populateOptions) query = query.populate(populateOptions);
    const apiFeature = await new APIFeature(query, req.query)
      .search()
      .filter()
      .sort()
      .limit()
      .paginate();
    const docs = await apiFeature.query;
    res.status(200).json({
      status: "success",
      page: apiFeature.page,
      totalPages: apiFeature.totalPages,
      result: docs.length,
      data: docs,
    });
  });
