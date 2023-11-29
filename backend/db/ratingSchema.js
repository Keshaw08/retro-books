const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  bookId: String,
  rating: Number,
});

module.exports =
  mongoose.model.Rating || mongoose.model("Rating", ratingSchema);
