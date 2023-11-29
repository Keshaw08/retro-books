import React, { useState, useEffect } from "react";
import "./BookModal.css";
import BookReview from "../BooksReview/BookReview";
import { FaStar } from "react-icons/fa";
import OfferModal from "./OfferModal/OfferModal";

function BookModal(props) {
  const {
    isOpen,
    closeModal,
    img,
    title,
    author,
    language,
    price,
    posted_by,
    isbn,
    bookId,
  } = props;

  const [selectedBookId, setSelectedBookId] = useState(bookId);

  const [reviewBookId, setReviewBookId] = useState(bookId);
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewBookId, email, review }),
    });

    if (response.status === 200) {
      console.log("Review submitted!");

      const newReview = { email, review };
      setReviews([...reviews, newReview]);

      setEmail("");
      setReview("");
    } else {
      console.error("Error submitting review");
    }
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reviews?reviewBookId=${selectedBookId}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("Error fetching reviews");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [selectedBookId]);

  const [averageRating, setAverageRating] = useState(0); // State to store average rating
  const [rating, setRating] = useState(averageRating || 0);

  const handleRatingClick = (value) => {
    fetch("http://localhost:5000/api/rate-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId: selectedBookId, rating: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Rating submitted:", data);
          setRating(value);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/get-average-rating?bookId=${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.averageRating);
        setRating(data.averageRating);
        console.log("Average Rating:", data.averageRating);
      })
      .catch((error) => {
        console.error("Error fetching average rating:", error);
      });
  }, [bookId]);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const openOfferModal = () => {
    setIsOfferModalOpen(true);
  };

  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeOfferModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const [postedSeller, setPostedSeller] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/current-user?email=${posted_by}`)
      .then((response) => response.json())
      .then((data) => {
        setPostedSeller(data.name);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, [posted_by]);

  return (
    <div>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-fullscreen-sm-down ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 image_modal_div">
                  <img src={img} alt="Book" />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 details_modal_div">
                  <div className="major-details">
                    <h3>
                      <div className="key">Title</div>
                      <div className="value-title">{title.toUpperCase()}</div>
                    </h3>
                    <h5>
                      <div className="key">Author</div>
                      <div className="value">{author}</div>
                    </h5>
                    <h5>
                      <div className="key">Language</div>
                      <div className="value">{language}</div>
                    </h5>
                    <h5>
                      <div className="key">Price</div>
                      <div className="value">₹ {price}</div>
                    </h5>
                    <h5>
                      <div className="key">Posted By</div>
                      <div className="value">{postedSeller}</div>
                    </h5>
                    <h5>
                      <div className="key">ISBNX</div>
                      <div className="value">{isbn}</div>
                    </h5>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-3 user-rating">
                      <h5>User Rating </h5>
                    </div>
                    <div className="col-9">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FaStar
                          className="rating-stars"
                          key={value}
                          onClick={() => handleRatingClick(value)}
                          style={{
                            color:
                              value <= (rating || averageRating)
                                ? "gold"
                                : "gray",
                            cursor: "pointer",
                            fontSize: "2rem",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <br />
                  <h5>Reviews</h5>
                  {reviews.map((review) => (
                    <BookReview
                      email={review.email}
                      reviewText={review.review}
                    />
                  ))}
                  <br />
                  <h5>Post Reviews</h5>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-form"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label text-form"
                        >
                          Write review here
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={openOfferModal}
              >
                Offer
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <OfferModal
        isOfferModalOpen={isOfferModalOpen}
        closeOfferModal={closeOfferModal}
        title={title}
        bookId={bookId}
        posted_by={posted_by}
        postedSeller={postedSeller}
      />
    </div>
  );
}

export default BookModal;
