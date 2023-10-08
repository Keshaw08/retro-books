const mongoose = require("mongoose");

// Define a schema for ratings
const ratingSchema = new mongoose.Schema({
  bookId: String,
  rating: Number,
});

// // Create a model based on the schema
// const Rating = mongoose.model("Rating", ratingSchema);

module.exports =
  mongoose.model.Rating || mongoose.model("Rating", ratingSchema);
