const mongoose = require("mongoose");

let schemaNewVideo = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});

var Video = mongoose.model("Video", schemaNewVideo);

module.exports = Video;
