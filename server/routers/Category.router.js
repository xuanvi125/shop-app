const express = require("express");
const CategoryController = require("../controllers/Category.controller");
const AuthController = require("../controllers/Auth.controller");
const BookRouter = require("./Book.router");
const CategoryRouter = express.Router();

CategoryRouter.use(AuthController.protect);
CategoryRouter.get("/", CategoryController.getAllCategory);
CategoryRouter.get("/:id", CategoryController.getCategory);

//for admin action
CategoryRouter.use("/:categoryID/books", BookRouter);
CategoryRouter.use(AuthController.restrictTo("admin"));
CategoryRouter.post("/", CategoryController.createCategory);
CategoryRouter.route("/:id")
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

module.exports = CategoryRouter;
