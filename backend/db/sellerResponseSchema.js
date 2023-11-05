const mongoose = require("mongoose");

// Define a schema for the sellerResponse collection
const sellerResponseSchema = new mongoose.Schema({
  answer: Boolean, // Acceptance status (true or false)
  bookId: String, // ID of the book related to the offer
  sender: String, // Sender's email
  posted_by: String, // Posted by email
  offerPrice: Number, // Offer price
});

// Create a model for the "sellerResponse" collection
const SellerResponse = mongoose.model("SellerResponse", sellerResponseSchema);

module.exports = SellerResponse;
