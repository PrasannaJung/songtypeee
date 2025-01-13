//product model
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    songName: {
      type: String,
      required: true,
    },
    songLyrics: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

//exporting
const Songs = mongoose.model("songs", songSchema);
module.exports = Songs;
