const { type } = require("express/lib/response");
const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let schemaNewOrder = mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientLoc: {
    type: String,
    trim: true,
    required: true,
  },

  clientPhoneNumber: {
    type: Number,
    required: true,
  },
  clientEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  color: {
    type: String,
  },
  size: { type: String },
  qty: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

var Order = mongoose.model("Order", schemaNewOrder);

module.exports = Order;
