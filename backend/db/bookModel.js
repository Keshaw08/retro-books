const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookImage: String,
  title: String,
  author: String,
  language: String,
  price: String,
  location: String,
  isbn: String,
  posted_by: String,
})

module.exports = mongoose.model.Books || mongoose.model("Books", bookSchema);
