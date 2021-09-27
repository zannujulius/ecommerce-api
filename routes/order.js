const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const { postOrders, getOrders } = require("../controller/order");

router.get("/orders", getOrders);

router.post("/orders", postOrders);

module.exports = router;
