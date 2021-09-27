const mongoose = require("mongoose");
const User = require("./user");

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  userId: {
    type: String,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
