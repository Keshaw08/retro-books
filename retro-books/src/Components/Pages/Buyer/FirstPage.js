import React, { useState, useEffect } from "react";
import Topbar from "../../Topbar/Topbar";
import Cards from "../../Book_Cards/Cards";
import "./FirstPage.css";
import Sidebar from "../../Sidebar/Sidebar";
import axios from "axios";

export default function FirstPage() {
  const [books, setBooks] = useState([]);
  const [searchedBook, setSearchedBook] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: "",
    maxPrice: "",
    language: "",
  });

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const searchBookById = (bookName) => {
    const foundBook = books.find(
      (book) => book.title.toLowerCase() === bookName.toLowerCase()
    );

    if (foundBook) {
      setSearchedBook(foundBook);
    } else {
      setSearchedBook(null);
    }
  };

  const onFilterChange = (filterCriteria) => {
    const { minPrice, maxPrice, language } = filterCriteria;
    const filteredBooks = filterBooks(books, filterCriteria);
    console.log("Filter criteria:", filterCriteria);
    setBooks(filteredBooks);
    setFilterCriteria(filterCriteria);
  };

  const onClearFilters = () => {
    setFilterCriteria({
      minPrice: "",
      maxPrice: "",
      language: "",
      location: "",
    });
    fetchBooks();
  };

  const filterBooks = (books, filterCriteria) => {
    const { minPrice, maxPrice, language } = filterCriteria;

    // Case 3: Both price and language filters are provided
    if (minPrice !== "" && maxPrice !== "" && language !== "") {
      return books.filter((book) => {
        const bookPrice = parseFloat(book.price);
        const isPriceValid = bookPrice >= minPrice && bookPrice <= maxPrice;
        const isLanguageValid =
          book.language.toLowerCase() === language.toLowerCase();
        return isPriceValid && isLanguageValid;
      });
    }

    if (minPrice !== "" && maxPrice !== "" && language === "") {
      return books.filter((book) => {
        const bookPrice = parseFloat(book.price);
        return bookPrice >= minPrice && bookPrice <= maxPrice;
      });
    }
    console.log("Selected language:", language);

    if (minPrice === "" && maxPrice === "" && language !== "") {
      const filteredBooks = books.filter((book) => {
        const isLanguageValid =
          book.language.toLowerCase() === language.toLowerCase();
        return isLanguageValid;
      });

      console.log("Filtered books by language:", filteredBooks);
      return filteredBooks;
    }

    return books;
  };

  return (
    <div>
      <Topbar searchFunction={searchBookById} />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1">
          <Sidebar
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            filterCriteria={filterCriteria}
          />
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
    </div>
  );
}
