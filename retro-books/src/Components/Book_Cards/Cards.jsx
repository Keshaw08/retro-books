// import React, { useState } from "react";
// import Heart from "react-animated-heart";
// // import Heart from "./index.tsx";
// import "./Cards.css";
// import BookModal from "./BooksModal/BookModal";

// function Cards(props) {
//   const [isClick, setClick] = useState(false);

//   return (
//     <div>
//       <div
//         className="card"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         <div className="card-img-div">
//           <img src={props.img} className="card-img-top" alt="image of book" />
//         </div>
//         <div className="card-body">
//           <div className="row">
//             <div className="col-8">
//               <h5 className="card-title">{props.title}</h5>
//               <h6 className="card-subtitle mb-2 author-title">
//                 Author - {props.author}
//               </h6>
//               <h6 className="card-subtitle mb-2">
//                 Language - {props.language}
//               </h6>
//               <h6 className="card-subtitle mb-2">Price - ₹ {props.price}</h6>
//             </div>
//             <div className="col-4">
//               <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <BookModal />
//     </div>
//   );
// }

// export default Cards;

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

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
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
    // console.log("User Email:", userData.email);
  }

  // const handleHeartClick = async () => {
  //   setClick(!isClick);
  //   try {
  //     const response = await axios.post(`http://localhost:5000/home`, {
  //       userId: userData.email, // Replace with the user's ID or email
  //       bookId: props.bookId, // Replace with the book's ID
  //     });

  //     if (response.status === 200) {
  //       // Book added to wishlist successfully
  //       setClick(true); // Update the heart icon's state
  //     } else {
  //       // Handle errors, e.g., book already in wishlist
  //     }
  //   } catch (error) {
  //     // Handle network or server errors
  //     console.error(error);
  //   }
  // };

  const handleHeartClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/wishlist/add`, {
        userId: userData.email, // Replace with the user's ID or email
        bookId: props.bookId, // Replace with the book's ID
      });

      if (response.status === 200) {
        // Book added to wishlist successfully
        setClick(true); // Update the heart icon's state
      } else {
        // Handle errors, e.g., book already in wishlist
        // You can set an error state or display an error message
      }
    } catch (error) {
      // Handle network or server errors
      console.error(error);
      // You can set an error state or display an error message
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
              <h6 className="card-subtitle mb-2">Price - ₹ {props.price}</h6>
            </div>
            <div className="col-4">
              {props.delete ? ( //handleRemoveFromWishlist(props.bookId)
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
                          <div
                            className="trash-lid"
                            // style="background-color: #E5E9EA"
                          ></div>
                          <div
                            className="trash-container"
                            // style="background-color: #E5E9EA"
                          ></div>
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
                        <div
                          className="trash-lid"
                          // style="background-color: #E5E9EA"
                        ></div>
                        <div
                          className="trash-container"
                          // style="background-color: #E5E9EA"
                        ></div>
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

      {/* Pass the book data and modal state to the BookModal */}
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
