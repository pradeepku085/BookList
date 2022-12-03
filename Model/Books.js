const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  Publisher: {
    type: String,
    required: true,
  },
  Published_Date: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Books", BookSchema);
