import React, { useState, useEffect } from "react";

function BookReview(props) {
  // const [reviewName, setReviewName] = useState("");

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/current-user?email=${props.email}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReviewName(data.name);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching current user:", error);
  //     });
  // }, [props.email]);

  return (
    <div>
      {/* <strong>{reviewName}</strong> */}
      <strong>{props.email}</strong>
      <p>{props.reviewText}</p>
    </div>
  );
}

export default BookReview;
