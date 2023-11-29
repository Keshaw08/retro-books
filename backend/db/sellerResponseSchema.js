const mongoose = require("mongoose");

const sellerResponseSchema = new mongoose.Schema({
  answer: Boolean,
  bookId: String,
  sender: String,
  posted_by: String,
  offerPrice: Number,
});

const SellerResponse = mongoose.model("SellerResponse", sellerResponseSchema);

module.exports = SellerResponse;
