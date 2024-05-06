const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const OrderController = require("../controllers/Order.controller");
const OrderRouter = express.Router();
OrderRouter.use(AuthController.protect);
OrderRouter.get("/", AuthController.filterByUser, OrderController.getAllOrders);
OrderRouter.route("/:id")
  .get(OrderController.getOrder)
  .patch(AuthController.restrictTo("admin"), OrderController.updateOrder);

module.exports = OrderRouter;
