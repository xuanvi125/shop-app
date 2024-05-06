const express = require("express");
const CartController = require("../controllers/Cart.controller");
const AuthController = require("../controllers/Auth.controller");
const CartRouter = express.Router();

CartRouter.use(AuthController.protect);
CartRouter.route("/")
  .get(CartController.getCartItems)
  .post(CartController.addCartItems);

CartRouter.route("/all")
  .delete(CartController.deleteAllCartItems);

CartRouter.route("/:id")
  .patch(CartController.updateCartItems)
  .delete(CartController.deleteCartItems);

module.exports = CartRouter;
