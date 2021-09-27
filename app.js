const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Accept,X-Auth-token,X-Username"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use((req, res, next) => {
  if (!req.get("X-Username")) {
    return next();
  }
  const id = req.get("X-Username");
  User.findById(id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/order");

app.use("/auth", authRoutes);
app.use(indexRoutes);
app.use("/admin", adminRoutes);
app.use(orderRoutes);

app.get("*", (req, res) => {
  res.json({
    message: `Can't find that`,
  });
});

mongoose
  .connect(process.env.mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Mongoose started ");
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
