import React, { useState } from "react";
import Heart from "react-animated-heart";
// import Heart from "./index.tsx";
import "./Cards.css";

function Cards(props) {
  const [isClick, setClick] = useState(false);
  return (
    <div>
      <div className="card">
        <div className="card-img-div">
          <img src={props.img} className="card-img-top" alt="image of book" />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h5 className="card-title">{props.title}</h5>
              <h6 className="card-subtitle mb-2">Author - {props.author}</h6>
              <h6 className="card-subtitle mb-2">Language - {props.language}</h6>
              <h6 className="card-subtitle mb-2">Price - ₹ {props.price}</h6>
            </div>
            <div className="col-4">
              <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
