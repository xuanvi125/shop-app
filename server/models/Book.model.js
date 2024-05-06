const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "book must have a name"],
  },
  author: {
    type: String,
    required: [true, "book must have author"],
  },
  price: {
    type: Number,
    required: [true, "book must have price"],
    min: [0, "Price must be greater than or equal to 0"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  ratingAverage: {
    type: Number,
    default: 4,
    set: (val) => Math.round(val * 10) / 10,
  },
  inventory: {
    type: Number,
    required: [true, "book must have inventory"],
    min: [0, "Inventory must be greater than or equal to 0"],
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dv79err1w/image/upload/v1705988154/product/efwphbwmbnlwqbhau7pz.png",
  },
  description: {
    type: String,
    trim: true,
  },
  publisher: String,
  publishedYear: {
    type: Number,
    default: 1900,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "book must have category"],
  },
});

bookSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
