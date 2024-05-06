const mongoose = require("mongoose");
const Book = require("./Book.model");
const ReviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, "Review must belong to a product"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  review: {
    type: String,
    required: [true, "Review can not be empty"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.statics.calcRating = async function (bookId) {
  const stats = await this.aggregate([
    {
      $match: { book: bookId },
    },
    {
      $group: {
        _id: "$book",
        ratingAverage: {
          $avg: "$rating",
        },
        ratingQuantity: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        ratingQuantity: 1,
        ratingAverage: 1,
      },
    },
  ]);

  if (stats.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      ratingQuantity: stats[0].ratingQuantity,
      ratingAverage: stats[0].ratingAverage,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      ratingQuantity: 0,
      ratingAverage: 4,
    });
  }
};

ReviewSchema.post("save", function () {
  this.constructor.calcRating(this.book);
});

ReviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});
ReviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcRating(this.r.book);
});
const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
