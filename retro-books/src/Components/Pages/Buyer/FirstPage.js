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
  // const { userId } = useUser();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:5000/get-books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  const userDataString = localStorage.getItem("user");
  var userData;
  if (userDataString) {
    userData = JSON.parse(userDataString);
    console.log("User Email:", userData.email);
  }

  return (
    <div>
      <Topbar />
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
                    title={x.title}
                    author={x.author}
                    language={x.language}
                    price={x.price}
                    img={`http://localhost:5000/${x.bookImage}`}
                    // posted_by={x.posted_by}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <p>{"id : " + userData.email}</p> */}
    </div>
  );
}
