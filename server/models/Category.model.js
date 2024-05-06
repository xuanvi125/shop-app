const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category must have a name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "category must have a description"],
    },
  },
  { timestamps: true }
);

categorySchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
