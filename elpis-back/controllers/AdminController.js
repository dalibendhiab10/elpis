require("dotenv").config();
const jwt = require("jsonwebtoken");
const Product = require("../models/newProduct");
const Video = require("../models/newVideo");

module.exports = {
  login: (req, res, next) => {
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }

    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).send({ error: "Username and password are required" });
    }

    if (userName === process.env.USER_NAME && password === process.env.USER_PASS) {
      const JWT_KEY = process.env.JWT_KEY;
      if (!JWT_KEY) {
        return res.status(500).send({ error: "JWT key is not set" });
      }

      try {
        const token = jwt.sign({ userName }, JWT_KEY);
        res.send({ result: "Admin logged in", userName, token }).status(200);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to generate token" });
      }
    } else {
      res.status(401).send({ error: "Access denied" });
    }
  },
  newProduct: async (req, res) => {
    console.log(req.body.productimg);
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }
    const { productName, description, price, quantitie, productimg } = req.body;
    if (!productName || !description || !price || !quantitie || !productimg) {
      return res.status(400).send({ error: "data is required" });
    }
    try {
      const newProduct = await Product.create({
        productName: productName,
        description: description,
        price: price,
        productimg: req.file.filename,
        quantitie: quantitie,
      });
      if (newProduct) console.log(newProduct);
      res
        .send({
          result: "Product is added successfully",
          newProduct: newProduct,
        })
        .status(200);
    } catch (err) {
      res.send({ error: err.message }).status(500);
    }
  },
  updateProduct: async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }
    const { productName, description, price, size, quantitie, productimg } = req.body;
    if (!productName && !description && !price && !size && !quantitie && !productimg) {
      return res.status(400).send({ error: "data is required" });
    }
    const productId = req.params.id;

    try {
      try {
        const editProduct = await Product.findByIdAndUpdate(productId, {
          productName: productName,
          description: description,
          price: price,
          productimg: productimg,
          size: size,
          quantitie: quantitie,
        });
        if (editProduct) {
          res.status(200).send({ result: editProduct });
        }
      } catch (err) {
        res.send({ result: err }).status(500);
      }
    } catch {
      return res.send({ error: "access denied !!!" });
    }
  },
  newVideo: async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }
    const { link } = req.body;
    if (!link) {
      return res.status(400).send({ error: "link is required" });
    }
    try {
      const newVideo = await Video.create({
        link: link,
      });
      if (newVideo)
        res
          .send({
            result: "Video is added successfully",
            newProduct: newVideo,
          })
          .status(200);
    } catch (err) {
      res.send({ error: err.message }).status(500);
    }
  },
};
