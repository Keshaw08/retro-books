import React from "react";

function BookReview(props) {
  return (
    <div>
      <strong>{props.email}</strong>
      <p>{props.reviewText}</p>
    </div>
  );
}

export default BookReview;
