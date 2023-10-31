import React, { useState, useEffect } from "react";
import Topbar from "../../Topbar/Topbar";
import Cards from "../../Book_Cards/Cards";
import "./FirstPage.css";
import Sidebar from "../../Sidebar/Sidebar";
// import books from "../../Book_Cards/Books";
import axios from "axios";
// import { useUser } from "../../Registration_Login/UserContext";

export default function FirstPage() {
  const [books, setBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null); // This will hold the searched book

  // const { userId } = useUser();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:5000/get-books");
        setBooks(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const searchBookById = (bookName) => {
    const foundBook = books.find(
      //search about which algorithm does find uses.
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (foundBook) {
      setSearchedBook(foundBook);
    } else {
      setSearchedBook(null); // Reset searchedBook if not found
    }

    console.log("search book : ", bookName);
  };
  // const userDataString = localStorage.getItem("user");
  // var userData;
  // if (userDataString) {
  //   userData = JSON.parse(userDataString);
  //   console.log("User Email:", userData.email);
  // }
  console.log(books);

  // const [filteredBooks, setFilteredBooks] = useState("");

  const onFilterChange = (filterCriteria) => {
    const { minPrice, maxPrice } = filterCriteria;

    // Apply the price filter to the book data
    const filteredBooks = books.filter((book) => {
      const bookPrice = parseFloat(book.price);
      if (
        (minPrice === "" || bookPrice >= minPrice) &&
        (maxPrice === "" || bookPrice <= maxPrice)
      ) {
        return true;
      }
      return false;
    });

    // Update the filtered books state
    // setFilteredBooks(filteredBooks);
    setBooks(filteredBooks)
  };

  // console.log("filtered books are : ",filteredBooks);

  return (
    <div>
      <Topbar searchFunction={searchBookById} />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1">
          <Sidebar onFilterChange={onFilterChange}/>
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
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <p>{"id : " + userData.email}</p> */}
    </div>
  );
}
