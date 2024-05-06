const factory = require("../utils/handleFactory");
const Review = require("../models/Review.model");
exports.setUserAndBookID = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.book) req.body.book = req.params.bookId;
  next();
};

exports.getAllReviews = factory.getAll(Review, {
  path: "user",
  select: "name image",
});
exports.getReview = factory.getOne(Review, [
  { path: "user", select: "name" },
  { path: "book", select: "name " },
]);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
