const { contentType } = require("express/lib/response");
const mongoose = require("mongoose");

let schemaNewProduct = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productimg: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  size: {
    type: Array,
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  quantitie: {
    type: Number,
    min: 1,
    required: true,
  },
});

var Product = mongoose.model("Product", schemaNewProduct);

module.exports = Product;
