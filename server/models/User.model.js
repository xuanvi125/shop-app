const mongoose = require("mongoose");
const crypto = require("crypto");
const Book = require("./Book.model");
const bcrypt = require("bcrypt");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
  },
  email: {
    type: String,
    required: [true, "user must have an email"],
  },
  password: {
    type: String,
    minlength: [
      6,
      "password length must be greater than or equal to 6 characters",
    ],
    required: [true, "user must have a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "confirm password must be the same password",
    },
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dv79err1w/image/upload/v1705827741/user/vettp93pj5cmz5ecdraf.jpg",
  },
  changePasswordAt: Date,
  role: {
    enum: ["user", "admin"],
    type: String,
    default: "user",
  },
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
  cart: {
    type: [cartSchema],
  },
  googleId: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.changePasswordAt = Date.now();
  next();
});

userSchema.methods.isCorrect = async function (dedicatePassword, userPassword) {
  const res = await bcrypt.compare(dedicatePassword, userPassword);
  return res;
};
userSchema.methods.isChangePassAfter = function (JWTTimeStamp) {
  if (this.changePasswordAt) {
    const time = parseInt(this.changePasswordAt.getTime() / 1000, 10);
    return JWTTimeStamp < time;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

cartSchema.path("quantity").validate({
  validator: async function (value) {
    const book = await Book.findById(this.product);
    return book.inventory >= value;
  },
  message: (props) => `this item will be out of stock!`,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
