import React, { useEffect, useState } from "react";
import Topbar from "../../Topbar/Topbar";
import "./BuyerMessages.css";

function BuyerMessages() {
  const [responses, setResponses] = useState([]);
  const [bookDetails, setBookDetails] = useState({});
  const userDataString = localStorage.getItem("user");

  const [userName, setUserName] = useState("");
  const [sellerUserName, setSellerUserName] = useState("");

  useEffect(() => {
    if (userDataString) {
      const currentUser = JSON.parse(userDataString);
      fetch(`http://localhost:5000/api/current-user?email=${currentUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }
  }, [userDataString]);

  useEffect(() => {
    if (userDataString) {
      const currentUser = JSON.parse(userDataString);
      const currentUserEmail = currentUser.email;

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

  const fetchBookDetailsForOffers = (offers) => {
    offers.forEach((offer) => {
      fetch(`http://localhost:5000/books/${offer.bookId}`)
        .then((response) => response.json())
        .then((data) => {
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

  const contactSellerAccepted = (email, bookDetails, offerPrice) => {
    fetch(`http://localhost:5000/api/current-user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        const recipientName = data.name;

        const subject = `Regarding the Book Sale: ${bookDetails.title}`;
        const body = `
        Hi ${recipientName},

        Thank you for accepting my offer for the book "${bookDetails.title}"! I'm excited to proceed with the purchase.

        Here are some details:

        - Title: ${bookDetails.title}
        - Author: ${bookDetails.author}
        - Price: ₹${bookDetails.price}
        - My Offer Price: ₹${offerPrice}

        Could you please provide the bank details for the transaction?

        Looking forward to hearing from you soon.

        Best regards,
        ${userName}
      `;

        openGmail(email, subject, body);
      })
      .catch((error) => {
        console.error("Error fetching recipient's name:", error);
      });
  };

  const contactSellerRejected = (email, bookDetails, offerPrice) => {
    fetch(`http://localhost:5000/api/current-user?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        const recipientName = data.name;

        const subject = `Regarding the Book Sale: ${bookDetails.title}`;
        const body = `
        Hi ${recipientName},

        I respect your decision in rejecting my offer for the book "${bookDetails.title}". 
        Could you please let me know what price you expect for this book?

        Here are some details:

        - Title: ${bookDetails.title}
        - Author: ${bookDetails.author}
        - Price: ₹${bookDetails.price}
        - My Offer Price: ₹${offerPrice}

        Looking forward to your response.

        Best regards,
        ${userName}
      `;

        openGmail(email, subject, body);
      })
      .catch((error) => {
        console.error("Error fetching recipient's name:", error);
      });
  };

  const openGmail = (email, subject, body) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`;
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
                    <h6>Accepted offer price: ₹{response.offerPrice}</h6>
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
                    <h6>Rejected offer price: ₹{response.offerPrice}</h6>
                    <h6>Sender: {response.posted_by}</h6>
                    <p>
                      <strong>Sorry,</strong> Seller has rejected your offer
                      price. Give them a better price.
                    </p>
                  </div>
                )}
              </div>
              <div className="row-lg-3 col-md-3 col-sm-12 action-buttons">
                {response.answer ? (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      contactSellerAccepted(
                        response.posted_by,
                        bookDetails[response.bookId],
                        response.offerPrice
                      )
                    }
                  >
                    Contact Seller
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      contactSellerRejected(
                        response.posted_by,
                        bookDetails[response.bookId],
                        response.offerPrice
                      )
                    }
                  >
                    Contact Seller
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerMessages;
