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
import Heart from "react-animated-heart";
import "./Cards.css";
import BookModal from "./BooksModal/BookModal";

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

  return (
    <div>
      <div className="card">
        <div className="card-img-div" onClick={openModal}>
          <img src={props.img} className="card-img-top" alt="image of book" />
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
              <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
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
      />
    </div>
  );
}

export default Cards;
