import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./BookForm.css";

function BookForm() {
  const userDataString = localStorage.getItem("user");
  const [formData, setFormData] = useState({
    bookImage: null,
    title: "",
    author: "",
    language: "",
    price: "",
    location: "",
    isbn: "",
  });

  const posted_by = userDataString ? JSON.parse(userDataString).email : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, bookImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("posted_by", posted_by);

    try {
      const response = await axios.post("http://localhost:5000/seller", data);
      console.log("Book data saved:", response.data);
      setFormData({
        bookImage: null,
        title: "",
        author: "",
        language: "",
        price: "",
        location: "",
        isbn: "",
      });
    } catch (error) {
      console.error("Error saving book data:", error);
    }
  };

  return (
    <div className="book-form-container">
      <h2 className="page-title">Enter Book Information</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="col-12">
              <label htmlFor="inputEmail4" className="form-label">
                Image of Book
              </label>
              <Form.Group controlId="bookImage">
                <Form.Control
                  type="file"
                  name="bookImage"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="col-12">
              <label htmlFor="inputPassword4" className="form-label">
                Title of Book
              </label>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Author of Book
              </label>
              <Form.Group controlId="author">
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-sm-12">
              <label htmlFor="inputEmail4" className="form-label">
                Language of Book
              </label>
              <Form.Group controlId="language">
                <Form.Control
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-sm-12">
              <label htmlFor="inputEmail4" className="form-label">
                Price of Book
              </label>
              <Form.Group controlId="price">
                <Form.Control
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-sm-12">
              <label htmlFor="inputEmail4" className="form-label">
                Location of Book
              </label>
              <Form.Group controlId="location">
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-sm-12">
              <label htmlFor="inputEmail4" className="form-label">
                ISBNX of Book
              </label>
              <Form.Group controlId="isbn">
                <Form.Control
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="col-12 submit-post-book">
          <button className="button-74" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
