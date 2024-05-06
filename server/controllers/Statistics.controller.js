const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Order = require("../models/Order.model");
exports.getTotalOrders = catchAsync(async (req, res, next) => {
  const count = await Order.countDocuments({});
  res.status(200).json({
    status: "success",
    count,
    message: "Total Orders",
  });
});
exports.getMonthlyRevenue = catchAsync(async (req, res, next) => {
  const monthlyRevenue = await Order.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$orderDate" },
          month: { $month: "$orderDate" },
        },
        totalRevenue: { $sum: "$total" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalRevenue: 1,
      },
    },
    {
      $sort: {
        year: 1,
        month: 1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: monthlyRevenue,
    message: "Monthly Revenue By Years",
  });
});

exports.getTopBestSelling = catchAsync(async (req, res, next) => {
  const { limit = 5 } = req.query;
  const topSellingProducts = await Order.aggregate([
    {
      $unwind: "$orderedProducts",
    },
    {
      $group: {
        _id: "$orderedProducts.product",
        totalQuantitySold: { $sum: "$orderedProducts.quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $addFields: {
        productDetails: { $arrayElemAt: ["$productDetails", 0] },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        totalQuantitySold: -1,
      },
    },
    {
      $limit: limit,
    },
  ]);
  res.status(200).json({
    status: "success",
    data: topSellingProducts,
  });
});

exports.getTotalRevenue = catchAsync(async (req, res, next) => {
  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: { totalRevenue: totalRevenue[0].total },
  });
});
