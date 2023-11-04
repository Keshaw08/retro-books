const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Book = require("./db/bookModel");
const auth = require("./auth");
const WishlistItem = require("./db/wishlistModal");
const Review = require("./db/reviewModal");
const Rating = require("./db/ratingSchema");
const Offer = require("./db/offerSchema");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// // POST route to save book data to MongoDB
// app.post('/seller', (req, res) => {
//   const bookData = req.body;

//   const newBook = new Book(bookData);

//   newBook.save((err, book) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     return res.status(201).send(book);
//   });
// });

// // API route to fetch all books
// app.get('get-books', async (req, res) => {
//   try {
//     const books = await Book.find(); // Fetch all books from MongoDB
//     res.json(books);
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// POST route to save book data to MongoDB
app.post("/seller", upload.single("bookImage"), async (req, res) => {
  const { title, author, language, price, location, isbn, posted_by } =
    req.body;
  console.log("here is the post request data :", req.body);

  try {
    const newBook = new Book({
      bookImage: req.file ? req.file.path : "",
      title,
      author,
      language,
      price,
      location,
      isbn,
      posted_by,
    });

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    console.error("Error saving book data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new route to fetch all books
app.get("/get-books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this route to your Express app to fetch a single book by ID
app.get("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/seller/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    // Use Mongoose to find and delete the book by its ID
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a book to the user's wishlist
// Add a book to the user's wishlist
app.post("/wishlist/add", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    console.log(req.body);

    // Check if a wishlist exists for the user, if not, create one
    let wishlistItem = await WishlistItem.findOne({ userId, bookId });

    if (!wishlistItem) {
      wishlistItem = new WishlistItem({ userId, bookId });
      await wishlistItem.save();
      res.status(200).json({ message: "Book added to wishlist" });
    } else {
      res.status(400).json({ message: "Book is already in the wishlist" });
    }
  } catch (error) {
    console.error("Error adding book to wishlist:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Fetch all wishlist items
app.get("/wishlist-books", async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/wishlist/delete", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Find and delete the wishlist item
    await WishlistItem.findOneAndDelete({ userId, bookId });

    res.status(200).json({ message: "Book removed from wishlist" });
  } catch (error) {
    console.error("Error removing book from wishlist:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const { reviewBookId, email, review } = req.body;
    const newReview = new Review({ reviewBookId, email, review });
    await newReview.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const { reviewBookId } = req.query;
    // Query MongoDB based on bookId and send the reviews back as JSON
    const reviews = await Review.find({ reviewBookId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// API endpoint for rating a book
app.post("/api/rate-book", (req, res) => {
  const { bookId, rating } = req.body;

  if (!bookId || !rating) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Create a new rating document and save it to the MongoDB collection
  const newRating = new Rating({ bookId, rating });

  newRating
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// API endpoint to get the average rating for a book
app.get("/api/get-average-rating", (req, res) => {
  const bookId = req.query.bookId;

  Rating.aggregate([
    { $match: { bookId: bookId } },
    {
      $group: {
        _id: "$bookId",
        averageRating: { $avg: "$rating" },
      },
    },
  ])
    .then((result) => {
      if (result.length > 0) {
        res.json({ averageRating: result[0].averageRating });
      } else {
        res.json({ averageRating: 0 }); // No ratings yet, return 0
      }
    })
    .catch((error) => {
      console.error("Error fetching average rating:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;

  try {
    // Use Mongoose's findByIdAndUpdate to update the book
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/create-offer", (req, res) => {
  const { offerPrice, sender, posted_by, bookId } = req.body;

  const offer = new Offer({
    offerPrice,
    sender,
    posted_by,
    bookId,
  });

  offer.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating offer." });
    } else {
      res.status(201).json({ message: "Offer created successfully." });
    }
  });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
