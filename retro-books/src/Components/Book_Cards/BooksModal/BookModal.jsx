// import React, {useState} from "react";

// function BookModal(props) {
//   const { isOpen, closeModal, img, title, author } = props;
//   return (
//     <div>
//       <div
//         // className="modal fade"
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-xl  modal-dialog-scrollable modal-fullscreen-sm-down">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">
//                 Modal title
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-lg-4 col-md-4 col-sm-12 image_modal_div">
//                 </div>
//                 <div className="col-lg-8 col-md-8 col-sm-8">
//                   <h3>{title}</h3>
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Adipisci amet sapiente beatae expedita maxime quod earum sed
//                     excepturi illo. Ab, vero voluptatum. Voluptatibus quia
//                     adipisci, ut reprehenderit aut quasi rerum?
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookModal;

import React from "react";
import "./BookModal.css";

function BookModal(props) {
  const { isOpen, closeModal, img, title, author, language, price, posted_by } =
    props;

  return (
    <div>
      <div
        className={`modal fade ${isOpen ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-fullscreen-sm-down ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 image_modal_div">
                  <img src={img} alt="Book" />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-8 details_modal_div">
                  <h1>Title : {title}</h1>
                  <h4>Author : {author}</h4>
                  <h4>Language : {language}</h4>
                  <h4>Price : {price}</h4>
                  <h4>Posted By : {posted_by}</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores sunt praesentium enim nisi sit soluta debitis?
                    Molestias ipsum exercitationem doloribus earum provident,
                    quasi veritatis itaque, officia quae neque eligendi
                    doloremque.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores sunt praesentium enim nisi sit soluta debitis?
                    Molestias ipsum exercitationem doloribus earum provident,
                    quasi veritatis itaque, officia quae neque eligendi
                    doloremque.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores sunt praesentium enim nisi sit soluta debitis?
                    Molestias ipsum exercitationem doloribus earum provident,
                    quasi veritatis itaque, officia quae neque eligendi
                    doloremque.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores sunt praesentium enim nisi sit soluta debitis?
                    Molestias ipsum exercitationem doloribus earum provident,
                    quasi veritatis itaque, officia quae neque eligendi
                    doloremque.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores sunt praesentium enim nisi sit soluta debitis?
                    Molestias ipsum exercitationem doloribus earum provident,
                    quasi veritatis itaque, officia quae neque eligendi
                    doloremque.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
