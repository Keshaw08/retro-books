// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import './BookForm.css';

// function BookForm() {
//   const [bookImage, setBookImage] = useState('');
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [language, setLanguage] = useState('');
//   const [price, setPrice] = useState('');
//   const [location, setLocation] = useState('');
//   const [isbn, setIsbn] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = {
//       bookImage,
//       title,
//       author,
//       language,
//       price,
//       location,
//       isbn,
//     };

//     // Make a POST request to your backend server
//     fetch('http://localhost:5000/seller', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Book data saved:', data);
//         // Reset the form fields after submission if needed
//         setBookImage('');
//         setTitle('');
//         setAuthor('');
//         setLanguage('');
//         setPrice('');
//         setLocation('');
//         setIsbn('');
//       })
//       .catch((error) => {
//         console.error('Error saving book data:', error);
//       });
//   };

//   return (
//     <div className="book-form-container">
//         <h2 className="form-heading">Book Information</h2>
//       <Form className="custom-form" onSubmit={handleSubmit}>
//         <Form.Group controlId="bookImage">
//           <Form.Label>Image of Book</Form.Label>
//           <Form.Control
//             type="file"
//             onChange={(e) => setBookImage(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="title">
//           <Form.Label>Title of Book</Form.Label>
//           <Form.Control
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="author">
//           <Form.Label>Author of Book</Form.Label>
//           <Form.Control
//             type="text"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="language">
//           <Form.Label>Language of Book</Form.Label>
//           <Form.Control
//             type="text"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="price">
//           <Form.Label>Price of Book</Form.Label>
//           <Form.Control
//             type="text"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="location">
//           <Form.Label>Location of Seller</Form.Label>
//           <Form.Control
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group controlId="isbn">
//           <Form.Label>ISBN of Book</Form.Label>
//           <Form.Control
//             type="text"
//             value={isbn}
//             onChange={(e) => setIsbn(e.target.value)}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default BookForm;

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './BookForm.css';

function BookForm() {
  const [formData, setFormData] = useState({
    bookImage: null,
    title: '',
    author: '',
    language: '',
    price: '',
    location: '',
    isbn: '',
  });

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

    try {
      const response = await axios.post('http://localhost:5000/seller', data);
      console.log('Book data saved:', response.data);
      // Reset the form fields after submission if needed
      setFormData({
        bookImage: null,
        title: '',
        author: '',
        language: '',
        price: '',
        location: '',
        isbn: '',
      });
    } catch (error) {
      console.error('Error saving book data:', error);
    }
  };

  return (
    <div className="book-form-container">
      <h2>Book Information</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="bookImage">
          <Form.Label>Image of Book</Form.Label>
          <Form.Control
            type="file"
            name="bookImage"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title of Book</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author of Book</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="language">
          <Form.Label>Language of Book</Form.Label>
          <Form.Control
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price of Book</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location of Seller</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="isbn">
          <Form.Label>ISBN of Book</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
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
