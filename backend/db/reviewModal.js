const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewBookId: String,
  email: String,
  review: String,
});

module.exports =
  mongoose.model.Review || mongoose.model("Review", reviewSchema);
