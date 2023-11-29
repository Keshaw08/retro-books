const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Book = require("./db/bookModel");
const auth = require("./auth");
const WishlistItem = require("./db/wishlistModal");
const Review = require("./db/reviewModal");
const Rating = require("./db/ratingSchema");
const Offer = require("./db/offerSchema");
const SellerResponse = require("./db/sellerResponseSchema");

dbConnect();

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })

    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
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

app.use("/uploads", express.static("uploads"));

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

app.get("/get-books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
    await Book.findByIdAndDelete(bookId);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/wishlist/add", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    console.log(req.body);
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
    const reviews = await Review.find({ reviewBookId });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/rate-book", (req, res) => {
  const { bookId, rating } = req.body;

  if (!bookId || !rating) {
    return res.status(400).json({ error: "Invalid request" });
  }

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
        res.json({ averageRating: 0 });
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

app.get("/api/offers", (req, res) => {
  const currentUserEmail = req.query.email;

  Offer.find({ posted_by: currentUserEmail }, (err, offers) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching offers." });
    } else {
      res.status(200).json(offers);
    }
  });
});

app.post("/api/seller-response", async (req, res) => {
  const { answer, bookId, sender, posted_by, offerPrice } = req.body;

  try {
    const response = new SellerResponse({
      answer,
      bookId,
      sender,
      posted_by,
      offerPrice,
    });

    await response.save();

    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error saving seller response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/seller-responses", async (req, res) => {
  try {
    const { email } = req.query;

    const sellerResponses = await SellerResponse.find({ sender: email });

    res.json(sellerResponses);
  } catch (error) {
    console.error("Error fetching seller responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/current-user", async (req, res) => {
  const userEmail = req.query.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ name: user.name });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
