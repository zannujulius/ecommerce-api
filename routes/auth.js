const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
} = require("../controller/auth");

require("dotenv").config();

// Get sign up
router.get("/signup", getSignup);

// Post sign up
router.post("/signup", postSignup);

// login
router.get("/login", getLogin);

// post
router.post("/login", postLogin);

module.exports = router;
