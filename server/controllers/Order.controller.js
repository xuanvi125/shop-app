const factory = require("../utils/handleFactory");
const Order = require("../models/Order.model");

exports.getAllOrders = factory.getAll(Order, [
  {
    path: "user",
    select: "name",
  },
  { path: "orderedProducts.product", select: "name price" },
]);
exports.getOrder = factory.getOne(Order, [
  {
    path: "user",
    select: "name",
  },
  {
    path: "orderedProducts.product",
    select: "name price image",
  },
]);

exports.updateOrder = factory.updateOne(Order);
