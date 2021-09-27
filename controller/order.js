const User = require("../models/user");
const Product = require("../models/products");

const data = {
  item: [
    {
      productName: "Air jordan XR3",
      productId: "614b23ef83b4b5b779da6348",
      quantity: 2,
      price: 750.32,
      total: 1500.64,
    },
    {
      productName: "iphone 12 pro max",
      productId: "614b259f83b4b5b779da634d",
      quantity: 4,
      price: 430.41,
      total: 1721.64,
    },
  ],
  total: 6,
};

let order = [];

exports.postOrders = (req, res) => {
  data.item.forEach((e) => {
    Product.findById(e.productId)
      .then((result) => {
        let id = String(result._id);
        if (e.productId !== id) {
          return res.json({
            error: "product doesnt exist",
          });
        } else {
          if (e.price !== result.originalPrice) {
            return res.json({
              error: `${e.productName}, has a wring price`,
            });
          } else {
            order.push(e);
            console.log(order);
            return res.send({
              message: "Added to order successfully",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getOrders = (req, res) => {
  console.log(req.body);
};
