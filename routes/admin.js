const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const authRoutes = require("../middleware/auth");
const { populate } = require("../models/products");
const Product = require("../models/products");
const User = require("../models/user");

router.get("/", authRoutes, (req, res) => {
  // res.send(req.user._id);
  res.send("Admin route");
});

// add a product
router.post("/addproducts", authRoutes, async (req, res) => {
  const {
    title,
    imagePath,
    description,
    originalPrice,
    newPrice,
    discount,
    slideImage,
  } = req.body;

  console.log(req.user, "admin.js");

  const product = new Product({
    title: title,
    imagePath: imagePath,
    description: description,
    originalPrice: originalPrice,
    newPrice: newPrice,
    discount: discount,
    slideImage: slideImage,
    userId: req.user._id,
  });

  product
    .save()
    .then((result) => {
      res.json({ message: "Product added successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// get Edit
router.get("/edit-product/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      res.json({
        message: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post Edit products
router.post("/edit-product/:id", (req, res) => {
  const {
    title,
    imagePath,
    slideImage,
    description,
    price,
    originalPrice,
    newPrice,
  } = req.body;

  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      (data.title = title),
        (data.imagePath = imagePath),
        (data.slideImage = slideImage),
        (data.description = description),
        (data.newPrice = newPrice),
        (data.price = price),
        (data.price = originalPrice);
      return data
        .save()
        .then((product) => {
          res.json({
            message: "Product updated successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post detele product
router.delete("/edit-product/:id", async (req, res) => {
  const id = req.params.id;

  Product.findOneAndDelete({ _id: id })
    .then((result) => {
      res.json({
        message: "Product deleted successfully",
      });
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
