const express = require("express");
const passport = require("passport");
const AuthController = require("../controllers/Auth.controller");
const AuthRouter = express.Router();

AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/login-fail",
    successRedirect: "/api/v1/auth/login-success",
  })
);
AuthRouter.get("/facebook", passport.authenticate("facebook"));

AuthRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/api/v1/auth/login-fail",
    successRedirect: "/api/v1/auth/login-success",
  })
);

AuthRouter.get("/login-fail", AuthController.loginFail);
AuthRouter.get("/login-success", AuthController.loginSuccess);
module.exports = AuthRouter;
