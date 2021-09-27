const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res) => {
  res.send("login route");
};

exports.postSignup = async (req, res) => {
  const { email, phonenumber, name, password, role } = req.body;
  //   validation
  if (!email.includes("@") || !email.includes(".")) {
    return res.json({
      error: "Please enter a valid email",
    });
  } else if (name == "") {
    return res.json({
      error: `Name can't be empty`,
    });
  } else if (password == "" || password.length < 4) {
    return res.json({
      error: "Please a valid password",
    });
  }

  //   checking if user exist
  const userData = await User.findOne({ email: email });
  // if email already exist
  if (userData) {
    return res.json({
      error: "The email has been taken by another user ",
    });
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    password: hashedPassword,
    email: email,
    phonenumber: phonenumber,
    role: role,
  });
  user
    .save()
    .then((user) => {
      jwt
        .sign({ id: user._id }, process.env.jwtSecret, { expiresIn: "1d" })
        .then((result) => {
          res.json({
            token,
            user: user,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getLogin = (req, res) => {
  res.send("login route");
};

exports.postLogin = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    // validation
    if (!data.email || !data.password)
      return res.jjson({ error: "both values are required" });
    // cheeck if email exist
    const userData = await User.findOne({ email: data.email });
    if (!userData) {
      return res.json({
        error: `Invalid email Try again`,
      });
    }
    // comparing password
    const validatePassword = await bcrypt.compare(
      data.password,
      userData.password
    );
    if (!validatePassword) return res.send("Incorrect password");

    const token = jwt.sign({ _id: userData._id }, process.env.jwtSecret, {
      expiresIn: "1d",
    });

    if (!token) {
      return res.send({
        error: "got token error",
      });
    }

    // set the response header
    res.setHeader("X-Auth-token", token);
    res.setHeader("X-Username", userData._id);

    res.json({
      message: "logged in success",
      token: token,
      user: userData.name.split(" ")[0],
    });
  } catch (error) {
    res.send("An error occured");
  }
};
