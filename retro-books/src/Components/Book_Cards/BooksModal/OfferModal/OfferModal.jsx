import React, { useState } from "react";
import "./OfferModal.css";

function OfferModal(props) {
  const {
    isOfferModalOpen,
    closeOfferModal,
    title,
    bookId,
    posted_by,
    postedSeller,
  } = props;
  const [offerPrice, setOfferPrice] = useState("");
  const userDataString = localStorage.getItem("user");
  var sender;
  if (userDataString) {
    sender = JSON.parse(userDataString);
    sender = sender.email; // Set sender to the email property
  }

  const handleSendOffer = () => {
    // Create an offer object to send to the backend
    const offerData = {
      offerPrice,
      sender, // This should be the email string
      posted_by,
      bookId,
    };

    // Make a POST request to your API endpoint
    fetch("http://localhost:5000/api/create-offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offerData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or perform any necessary actions
        console.log("Offer sent successfully:", data);
        // You can also close the modal or show a success message to the user
        closeOfferModal();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error sending offer:", error);
      });
  };

  return (
    <div>
      <div
        className={`modal fade ${isOfferModalOpen ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: isOfferModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Send Offer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeOfferModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="send-details">
                <h3>
                  <div className="key">Title : {title.toUpperCase()}</div>
                  <hr />
                </h3>
                <h5>
                  <div className="key">Sending to : {postedSeller}</div>
                  <hr />
                </h5>
              </div>
              <div className="offer-amount-div">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    Enter Offer Price (₹)
                  </span>
                  <input
                    type="number"
                    class="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeOfferModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendOffer}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
