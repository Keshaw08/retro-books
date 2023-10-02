// import React, {useState} from "react";

// function BookModal(props) {
//   const { isOpen, closeModal, img, title, author } = props;
//   return (
//     <div>
//       <div
//         // className="modal fade"
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-xl  modal-dialog-scrollable modal-fullscreen-sm-down">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Modal title
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-lg-4 col-md-4 col-sm-12 image_modal_div">
//                 </div>
//                 <div className="col-lg-8 col-md-8 col-sm-8">
//                   <h3>{title}</h3>
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Adipisci amet sapiente beatae expedita maxime quod earum sed
//                     excepturi illo. Ab, vero voluptatum. Voluptatibus quia
//                     adipisci, ut reprehenderit aut quasi rerum?
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookModal;

import React, { useState, useEffect } from "react";
import "./BookModal.css";
import BookReview from "../BooksReview/BookReview";

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

  // setSelectedBookId(bookId);

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
      // Review submitted successfully
      console.log("Review submitted!");
    } else {
      // Handle errors here
      console.error("Error submitting review");
    }
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews based on the currentBookId
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
                      <div className="value">{posted_by}</div>
                    </h5>
                    <h5>
                      <div className="key">ISBNX</div>
                      <div className="value">{isbn}</div>
                    </h5>
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
                        {/* <div id="emailHelp" className="form-text">
                          We'll never share your email with anyone else.
                        </div> */}
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
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
