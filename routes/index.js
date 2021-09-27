const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const User = require("../models/user");
const Cart = require("../models/cart");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("userId");
    // console.log(products);
    res.json({
      message: products,
    });
  } catch (error) {
    res.send({
      error: "An occured",
    });
  }
});

//Get a particular product
router.get("/product-details/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      // console.log(product);
      res.json({
        message: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
