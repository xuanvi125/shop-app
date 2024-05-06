const express = require("express");
const BookController = require("../controllers/Book.controller");
const AuthController = require("../controllers/Auth.controller");
const ReviewRouter = require("./Review.router");
const BookRouter = express.Router({ mergeParams: true });
BookRouter.get(
  "/top-lower",
  AuthController.protect,
  BookController.setTopLowStock,
  BookController.getAllBook
);
BookRouter.get(
  "/total-product",
  AuthController.protect,
  AuthController.restrictTo("admin"),
  BookController.getTotalBook
);

BookRouter.use(AuthController.protect);
BookRouter.get("/", BookController.getAllBook);
BookRouter.get("/:id", BookController.getBook);

BookRouter.use("/:bookId/reviews", ReviewRouter);
//for admin action
BookRouter.use(AuthController.restrictTo("admin"));

BookRouter.post(
  "/",
  BookController.uploadBookImage,
  BookController.setCategoryID,
  BookController.createBook
);
BookRouter.route("/:id")
  .patch(BookController.uploadBookImage, BookController.updateBook)
  .delete(BookController.deleteBook);

module.exports = BookRouter;
