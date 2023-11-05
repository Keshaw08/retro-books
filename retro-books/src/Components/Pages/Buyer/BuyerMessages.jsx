import React, { useEffect, useState } from "react";
import Topbar from "../../Topbar/Topbar";
import "./BuyerMessages.css";

function BuyerMessages() {
  const [responses, setResponses] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const userDataString = localStorage.getItem("user");

  useEffect(() => {
    if (userDataString) {
      const currentUser = JSON.parse(userDataString);
      const currentUserEmail = currentUser.email;

      // Fetch seller responses for the currently logged-in user
      fetch(`http://localhost:5000/seller-responses?email=${currentUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setResponses(data);
          fetchBookDetailsForOffers(data);
        })
        .catch((error) => {
          console.error("Error fetching seller responses:", error);
        });
    }
  }, [userDataString]);

  // Function to fetch book details for each offer
  const fetchBookDetailsForOffers = (offers) => {
    offers.forEach((offer) => {
      fetch(`http://localhost:5000/books/${offer.bookId}`)
        .then((response) => response.json())
        .then((data) => {
          // Store the book details for the offer in the state
          setBookDetails((prevBookDetails) => ({
            ...prevBookDetails,
            [offer.bookId]: data,
          }));
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
        });
    });
  };

  // Function to open Gmail with the recipient's email pre-filled
  const contactSeller = (email) => {
    const subject = "Regarding the Book Sale"; // You can customize the subject
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
    window.open(gmailLink);
  };

  return (
    <div>
      <Topbar />
      <div className="showing-messages">
        {responses.map((response) => (
          <div
            className="alert alert-secondary"
            role="alert"
            key={response._id}
          >
            <div className="row">
              <div className="row-lg-9 col-md-9 col-sm-12">
                {response.answer ? (
                  <div>
                    <h5>Book Title: {bookDetails[response.bookId]?.title}</h5>
                    <br />
                    <h6>Accepted offer price: {response.offerPrice}</h6>
                    <h6>Sender: {response.posted_by}</h6>
                    <p>
                      <strong>𝓒𝓸𝓷𝓰𝓻𝓪𝓽𝓾𝓵𝓪𝓽𝓲𝓸𝓷𝓼 !!</strong> Seller has accepted
                      your offer price. Contact them.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h5>Book Title: {bookDetails[response.bookId]?.title}</h5>
                    <br />
                    <h6>Rejected offer price: {response.offerPrice}</h6>
                    <h6>Sender: {response.posted_by}</h6>
                    <p>
                      <strong>Sorry,</strong> Seller has rejected your offer
                      price. Give them a better price.
                    </p>
                  </div>
                )}
              </div>
              <div className="row-lg-3 col-md-3 col-sm-12 action-buttons">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  onClick={() => contactSeller(response.posted_by)}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerMessages;
