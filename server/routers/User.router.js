const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const UserController = require("../controllers/User.controller");
const CartRouter = require("./Cart.router");
const AccountRouter = require("./Account.router");
const OrderRouter = require("./Order.router");
const UserRouter = express.Router({ mergeParams: true });

UserRouter.post("/login", AuthController.login);
UserRouter.post("/signup", AuthController.signup);
UserRouter.post("/logout", AuthController.logout);
UserRouter.post("/forgot-password", AuthController.forgotPassword);
UserRouter.post("/reset-password/:token", AuthController.resetPassword);

//for login user
UserRouter.use(AuthController.protect);
UserRouter.get("/me", UserController.getCurrentUser);
UserRouter.post("/update-password", AuthController.updatePassword);

UserRouter.post(
  "/update-me",
  UserController.uploadAvatar,
  UserController.updateMe
);

//cart item
UserRouter.use("/cart/items", CartRouter);
UserRouter.use("/orders", OrderRouter);
UserRouter.use("/accounts", AccountRouter);
UserRouter.get(
  "/total-users",
  AuthController.restrictTo("admin"),
  UserController.getTotalUsers
);

UserRouter.use(AuthController.restrictTo("admin"));
UserRouter.route("/").get(UserController.getAllUsers);
UserRouter.route("/:id").patch(UserController.updateUser);
module.exports = UserRouter;
