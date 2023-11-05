import React, { useEffect, useState } from "react";
import TopbarSeller from "../../Topbar/TopbarSeller";
import "./SellerMessages.css";

function SellerMessages() {
  const [offers, setOffers] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const userDataString = localStorage.getItem("user");

  useEffect(() => {
    if (userDataString) {
      const currentUser = JSON.parse(userDataString);
      const currentUserEmail = currentUser.email;

      // Fetch offers for the currently logged-in user
      fetch(`http://localhost:5000/api/offers?email=${currentUserEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setOffers(data);
          // Fetch book details for each offer
          fetchBookDetailsForOffers(data);
        })
        .catch((error) => {
          console.error("Error fetching offers:", error);
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

  // Function to handle the seller's response
  const handleResponse = (offer, answer) => {
    const { bookId, sender, posted_by, offerPrice } = offer;

    // Send the response to the server
    fetch("http://localhost:5000/api/seller-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer,
        bookId,
        sender,
        posted_by,
        offerPrice,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response sent successfully:", data);
        // Optionally, you can update the UI to reflect the response.
      })
      .catch((error) => {
        console.error("Error sending response:", error);
      });
  };

  return (
    <div>
      <TopbarSeller />
      <div className="showing-messages">
        {offers.map((offer) => (
          <div className="alert alert-secondary" role="alert" key={offer._id}>
            <div className="row">
              <div className="row-lg-9 col-md-9 col-sm-12">
                <h5>Book Title: {bookDetails[offer.bookId]?.title}</h5>
                <br />
                <h6>Sell Price : {bookDetails[offer.bookId]?.price}</h6>
                <h6>Offer Price: {offer.offerPrice}</h6>
                <h6>Offer given by: {offer.sender}</h6>
              </div>
              <div className="row-lg-3 col-md-3 col-sm-12 action-buttons">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => handleResponse(offer, true)}
                >
                  Accept Offer
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleResponse(offer, false)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerMessages;
