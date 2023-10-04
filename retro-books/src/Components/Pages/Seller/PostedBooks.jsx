import React, { useState, useEffect } from "react";
import TopbarSeller from "../../Topbar/TopbarSeller";
import Sidebar from "../../Sidebar/Sidebar";
import Cards from "../../Book_Cards/Cards";
import axios from "axios";

function PostedBooks() {
  const userDataString = localStorage.getItem("user");
  var userData;
  if (userDataString) {
    userData = JSON.parse(userDataString);
    console.log("User Email:", userData.email);
  }

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:5000/get-books");
        const filteredBooks = response.data.filter(
          (book) => book.posted_by === userData.email
        );
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    if (userData && userData.email) {
      fetchBooks();
    }
  }, [userData]); // Add userData as a dependency to re-fetch books when the user changes

  async function handleDeleteBook(bookId) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/seller/${bookId}`
      );

      // Remove the deleted book from the state
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));

      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
    console.log("delete book Id is : ", bookId);
  }

  return (
    <div>
      <TopbarSeller />
      {/* <h1>All books you posted are here.</h1> */}
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1">
          <Sidebar />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11">
          <div className="cards-section">
            <div className="row">
              {books.map((x) => (
                <div className="col-lg-4 col-md-6 col-sm-12 card-books">
                  <Cards
                    bookId={x._id}
                    title={x.title}
                    author={x.author}
                    language={x.language}
                    price={x.price}
                    img={`http://localhost:5000/${x.bookImage}`}
                    posted_by={x.posted_by}
                    isbn={x.isbn}
                    delete={true}
                    deleteFunction={handleDeleteBook}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostedBooks;
