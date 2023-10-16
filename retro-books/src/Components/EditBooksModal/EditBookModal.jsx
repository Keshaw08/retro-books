// import React from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import axios from "axios";

// function EditBookModal({ onClose, bookId }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     language: "",
//     price: "",
//     location: "",
//     isbn: "",
//   });

//   useEffect(() => {
//     // Fetch book data for the given bookId and populate the form fields
//     axios.get(`http://localhost:5000/books/${bookId}`).then((response) => {
//       const bookData = response.data;
//       setFormData({
//         title: bookData.title,
//         author: bookData.author,
//         language: bookData.language,
//         price: bookData.price,
//         location: bookData.location,
//         isbn: bookData.isbn,
//       });
//     });
//   }, [bookId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the book data
//       const response = await axios.put(
//         `http://localhost:5000/books/${bookId}`,
//         formData
//       );
//       console.log("Book data updated:", response.data);
//       // Redirect or show a success message
//     } catch (error) {
//       console.error("Error updating book data:", error);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="modal fade show" // Add the "show" class to make it visible
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//         style={{ display: "block" }}
//       >
//         <div className="modal-dialog modal-xl">
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
//                 onClick={onClose} // Call onClose to close the modal
//               ></button>
//             </div>
//             <div className="modal-body">
//               {/* Your edit form or content goes here */}
//               {/* You can put your edit form in this section */}
//               <h1>bookId : {bookId}</h1>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//                 onClick={onClose} // Call onClose to close the modal
//               >
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary">
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditBookModal;

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./EditBookModal.css";

function EditBookModal({ onClose, bookId }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "",
    price: "",
    location: "",
    isbn: "",
  });

  useEffect(() => {
    // Fetch book data for the given bookId and populate the form fields
    axios.get(`http://localhost:5000/books/${bookId}`).then((response) => {
      const bookData = response.data;
      setFormData({
        title: bookData.title,
        author: bookData.author,
        language: bookData.language,
        price: bookData.price,
        location: bookData.location,
        isbn: bookData.isbn,
      });
    });
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the book data
      const response = await axios.put(
        `http://localhost:5000/books/${bookId}`,
        formData
      );
      console.log("Book data updated:", response.data);
      onClose(); // Close the modal
      // Redirect or show a success message
    } catch (error) {
      console.error("Error updating book data:", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade show" // Add the "show" class to make it visible
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Book details for : {formData.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose} // Call onClose to close the modal
              ></button>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleSubmit}>
                <div className="edit-modal-body">
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="language">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      type="text"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="isbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                {/* <Button variant="secondary" onClick={onClose}>
                  Close
                </Button> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={onClose} // Call onClose to close the modal
                  >
                    Close
                  </button>
                  {/* <Button variant="primary" type="submit">
                  Save changes
                </Button> */}
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
                {/* <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose} // Call onClose to close the modal
                >
                  Close
                </button> */}
                {/* <button type="submit" className="btn btn-primary">
                  Save changes
                </button> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBookModal;
