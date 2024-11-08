const express = require("express");
const router = express.Router();
const controller = require("../controllers/guestControllers.js");

router.get("/products", controller.getAllProducts);
router.get("/video", controller.getVideo);
router.post("/order", controller.placeOrder);

module.exports = router;
