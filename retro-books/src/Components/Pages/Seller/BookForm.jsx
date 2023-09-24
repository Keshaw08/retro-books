import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './BookForm.css';

function BookForm() {
  const [bookImage, setBookImage] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      bookImage,
      title,
      author,
      language,
      price,
      location,
      isbn,
    };

    // Make a POST request to your backend server
    fetch('http://localhost:5000/seller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Book data saved:', data);
        // Reset the form fields after submission if needed
        setBookImage('');
        setTitle('');
        setAuthor('');
        setLanguage('');
        setPrice('');
        setLocation('');
        setIsbn('');
      })
      .catch((error) => {
        console.error('Error saving book data:', error);
      });
  };

  return (
    <div className="book-form-container">
        <h2 className="form-heading">Book Information</h2>
      <Form className="custom-form" onSubmit={handleSubmit}>
        <Form.Group controlId="bookImage">
          <Form.Label>Image of Book</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setBookImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title of Book</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author of Book</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="language">
          <Form.Label>Language of Book</Form.Label>
          <Form.Control
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price of Book</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location of Seller</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="isbn">
          <Form.Label>ISBN of Book</Form.Label>
          <Form.Control
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BookForm;
