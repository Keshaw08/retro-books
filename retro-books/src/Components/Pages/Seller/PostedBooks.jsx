import React, { useState, useEffect } from "react";
import TopbarSeller from "../../Topbar/TopbarSeller";
import Sidebar from "../../Sidebar/Sidebar";
import Cards from "../../Book_Cards/Cards";
import axios from "axios";
import EditBookModal from "../../EditBooksModal/EditBookModal";

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
  }, [userData]);
  async function handleDeleteBook(bookId) {
    var answer = window.confirm("Are you sure you want to delete the book?");
    if (answer) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/seller/${bookId}`
        );

        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );

        console.log(response.data.message);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
      console.log("delete book Id is : ", bookId);
    } else {
      console.log("NO");
    }
  }

  const [searchedBook, setSearchedBook] = useState(null);
  const searchBookById = (bookName) => {
    const foundBook = books.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (foundBook) {
      setSearchedBook(foundBook);
    } else {
      setSearchedBook(null);
    }

    console.log("search book : ", bookName);
  };

  const [currentBook, setCurrentBook] = useState(null);
  const editBook = (currentBookId) => {
    setCurrentBook(currentBookId);
  };
  console.log("edit book function called for : ", currentBook);

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        setCurrentBook(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div>
      <TopbarSeller searchFunction={searchBookById} />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1">
          <Sidebar />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11">
          <div className="cards-section">
            <div className="row">
              {searchedBook ? (
                <div className="col-lg-4 col-md-6 col-sm-12 card-books">
                  <Cards
                    bookId={searchedBook._id}
                    title={searchedBook.title}
                    author={searchedBook.author}
                    language={searchedBook.language}
                    price={searchedBook.price}
                    img={`http://localhost:5000/${searchedBook.bookImage}`}
                    posted_by={searchedBook.posted_by}
                    isbn={searchedBook.isbn}
                    delete={true}
                    deleteFunction={handleDeleteBook}
                    edit={true}
                    editFunction={editBook}
                  />
                </div>
              ) : (
                books.map((x) => (
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
                      edit={true}
                      editFunction={editBook}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {currentBook !== null && (
        <EditBookModal
          bookId={currentBook}
          onClose={() => setCurrentBook(null)}
        />
      )}
    </div>
  );
}

export default PostedBooks;
