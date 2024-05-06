const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "order must belong to a user"],
  },
  orderedProducts: {
    type: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Book",
        },
        quantity: {
          type: Number,
          required: [true, "product must have quantity"],
          min: [1, "quantity must be greater than or equal to 1"],
          default: 1,
        },
      },
    ],
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "shipped", "processing", "cancelled"],
      message: "status must be pending, shipped, or processing or cancelled",
    },
    default: "pending",
  },
  shippingAddress: {
    type: String,
    required: [true, "order must have shipping address"],
  },
  total: {
    type: Number,
    default: 0,
    min: [0, "total must be greater than or equal to 0"],
  },
});

module.exports = mongoose.model("Order", orderSchema);
