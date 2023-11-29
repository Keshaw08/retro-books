import React, { useState, useEffect } from "react";
import BookModal from "./BooksModal/BookModal";
import Heart from "react-animated-heart";
// import Heart from "./index.tsx";
import "./Cards.css";
import axios from "axios";
import { FaPenToSquare } from "react-icons/fa6";

function Cards(props) {
  const [isClick, setClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const userDataString = localStorage.getItem("user");
  var userData;
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  const handleHeartClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/wishlist/add`, {
        userId: userData.email,
        bookId: props.bookId,
      });

      if (response.status === 200) {
        setClick(true);
      } else {
        // Handle errors, e.g., book already in wishlist
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-img-div" onClick={openModal}>
          <img src={props.img} className="card-img-top" alt={props.title} />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-8" onClick={openModal}>
              <h5 className="card-title">{props.title}</h5>
              <h6 className="card-subtitle mb-2 author-title">
                Author - {props.author}
              </h6>
              <h6 className="card-subtitle mb-2">
                Language - {props.language}
              </h6>
              <h6 className="card-subtitle mb-2">Price - ₹{props.price}</h6>
            </div>
            <div className="col-4">
              {props.delete ? (
                <div>
                  {props.edit ? (
                    <div>
                      <div className="edit-button">
                        <FaPenToSquare
                          onClick={() => props.editFunction(props.bookId)}
                        />
                      </div>
                      <div
                        className="dustbin"
                        onClick={() => props.deleteFunction(props.bookId)}
                      >
                        <div className="icon-trash">
                          <div className="trash-lid"></div>
                          <div className="trash-container"></div>
                          <div className="trash-line-1"></div>
                          <div className="trash-line-2"></div>
                          <div className="trash-line-3"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="dustbin no-edit-button"
                      onClick={() => props.deleteFunction(props.bookId)}
                    >
                      <div className="icon-trash">
                        <div className="trash-lid"></div>
                        <div className="trash-container"></div>
                        <div className="trash-line-1"></div>
                        <div className="trash-line-2"></div>
                        <div className="trash-line-3"></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="col-4">
                  {/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> */}
                  <Heart isClick={isClick} onClick={handleHeartClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BookModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        img={props.img}
        title={props.title}
        author={props.author}
        language={props.language}
        price={props.price}
        posted_by={props.posted_by}
        isbn={props.isbn}
        bookId={props.bookId}
      />
    </div>
  );
}

export default Cards;
