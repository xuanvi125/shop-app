const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "account must belong to a user"],
  },
  beneficiaryName: {
    type: String,
    required: [true, "account must have a beneficiary name"],
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `Invalid number ! ${props.value} must have 10 digits`,
    },
  },
  balance: {
    type: Number,
    default: 2000000,
    min: [0, "balance must be greater than or equal to 0"],
  },
});

module.exports = mongoose.model("Account", accountSchema);
