const Products = require("../models/newProduct");
const Video = require("../models/newVideo");
const Order = require("../models/newOrder");

module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const findAllProducts = await Products.find();
      if (findAllProducts) return res.send({ result: findAllProducts }).status(200);
    } catch (err) {
      res.send({ result: err }).status(500);
    }
  },
  getVideo: async (req, res) => {
    try {
      const findVideo = await Video.find();
      if (findVideo) return res.send({ result: findVideo }).status(200);
    } catch (err) {
      res.send({ result: err }).status(500);
    }
  },
  placeOrder: async (req, res, next) => {
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }
    const { clientName, clientLoc, clientPhoneNumber, clientEmail, color, size, qty } =
      req.body;
    if (!clientName || !clientLoc || !clientPhoneNumber || !clientEmail) {
      return res.status(400).send({ error: "data is required" });
    }
    try {
      const newOrder = await Order.create({
        clientName: clientName,
        clientLoc: clientLoc,
        clientPhoneNumber: clientPhoneNumber,
        clientEmail: clientEmail,
        color: color,
        size: size,
        qty: qty,
      });
      if (newOrder)
        res
          .send({
            result: "Order is Placed successfully",
            newProduct: newOrder,
          })
          .status(200);
    } catch (err) {
      res.send({ error: err.message }).status(500);
    }
  },
};
