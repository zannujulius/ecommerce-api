const mongoose = require("mongoose");
const User = require("../models/user");

const productSchema = mongoose.Schema({
  title: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  description: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  slideImage: [{ type: String }],
  createdAt: {
    type: String,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
