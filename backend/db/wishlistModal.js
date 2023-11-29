const mongoose = require("mongoose");

const WishlistItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  bookId: {
    type: String,
    ref: "Book",
  },
});

const WishlistItem = mongoose.model("WishlistItem", WishlistItemSchema);

module.exports = WishlistItem;
