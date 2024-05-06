const express = require("express");
const AuthController = require("../controllers/Auth.controller");
const ReviewController = require("../controllers/Review.controller");
const ReviewRouter = express.Router({ mergeParams: true });

ReviewRouter.use(AuthController.protect);
ReviewRouter.route("/")
  .get(ReviewController.getAllReviews)
  .post(
    AuthController.restrictTo("user"),
    ReviewController.setUserAndBookID,
    ReviewController.createReview
  );
ReviewRouter.route("/:id")
  .get(ReviewController.getReview)
  .patch(AuthController.restrictTo("user"), ReviewController.updateReview)
  .delete(AuthController.restrictTo("user"), ReviewController.deleteReview);

module.exports = ReviewRouter;
