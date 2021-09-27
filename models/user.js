const mongoose = require("mongoose");
const Cart = require("../models/cart");

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
