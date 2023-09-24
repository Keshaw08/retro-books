import React, { useState, useEffect } from 'react';
import Topbar from "../../Topbar/Topbar";
import Cards from "../../Book_Cards/Cards";
import "./FirstPage.css";
import Sidebar from "../../Sidebar/Sidebar";
// import books from "../../Book_Cards/Books";
import { fetchBooks } from '../../Book_Cards/bookService';

export default function FirstPage() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBookData() {
      try {
        const bookData = await fetchBooks();
        setBooks(bookData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBookData();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="row">
        <div className="col-lg-1 col-md-1 col-sm-1">
          <Sidebar />
        </div>
        <div className="col-lg-11 col-md-11 col-sm-11">
          <div className="cards-section">
            <div className="row ">
              {books.map((x) => (
                <div className="col-lg-4 col-md-6 col-sm-12 card-books">
                  <Cards title={x.title} author={x.author} language={x.language} price={x.price} img={x.img} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
