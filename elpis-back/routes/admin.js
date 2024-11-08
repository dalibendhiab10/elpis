const express = require("express");
const router = express.Router();
const controller = require("../controllers/AdminController");
const { verifyToken } = require("./authorization");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/login", controller.login);
router.post("/product", verifyToken, upload.single("files"), controller.newProduct);
router.put("/updateproduct/:id", verifyToken, controller.updateProduct);
router.post("/video", verifyToken, controller.newVideo);

module.exports = router;
