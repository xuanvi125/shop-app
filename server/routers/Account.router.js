const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const AccountController = require("../controllers/Account.controller");
const AccountRouter = express.Router();

AccountRouter.use(AuthController.protect);
AccountRouter.post("/payment", AccountController.pay);
AccountRouter.post(
  "/",
  AccountController.setUserId,
  AccountController.createAccount
);

AccountRouter.get(
  "/",
  AuthController.filterByUser,
  AccountController.getAllAccount
);

AccountRouter.route("/:id")
  .get(AccountController.getAccount)
  .patch(AuthController.restrictTo("admin"), AccountController.updateAccount)
  .delete(AccountController.deleteAccount);

module.exports = AccountRouter;
