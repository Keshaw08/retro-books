// const mongoose = require("mongoose");

// // Define a Book schema using Mongoose
// const bookSchema = new mongoose.Schema({
//   bookImage: String,
//   title: String,
//   author: String,
//   language: String,
//   price: String,
//   location: String,
//   isbn: String,
// });

// module.exports = mongoose.model.Books || mongoose.model("Books", bookSchema);

const mongoose = require("mongoose");

// Define a Book schema using Mongoose
const bookSchema = new mongoose.Schema({
  bookImage: String,
  title: String,
  author: String,
  language: String,
  price: String,
  location: String,
  isbn: String,
})
module.exports = mongoose.model.Books || mongoose.model("Books", bookSchema);
