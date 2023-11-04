const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offerPrice: Number,
  sender: String,
  posted_by: String,
  bookId: String,
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
