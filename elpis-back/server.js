const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const adminRoute = require("./routes/admin");
const guestRoute = require("./routes/guest");

var bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PUT, PATCH , DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.json());
// home page
app.get("/api/", (req, res) => {
  res.send({ welcome: "welcome" });
});

app.use("/admin", adminRoute);
app.use("/guest", guestRoute);

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PUT, PATCH , DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
