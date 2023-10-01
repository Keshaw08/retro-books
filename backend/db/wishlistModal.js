const mongoose = require("mongoose");

const WishlistItemSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User", // Reference to your User model
  },
  bookId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Book", // Reference to your Book model
  },
});

const WishlistItem = mongoose.model("WishlistItem", WishlistItemSchema);

module.exports = WishlistItem;
