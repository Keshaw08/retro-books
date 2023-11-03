// import React, { useEffect, useState } from "react";
// import Topbar from "../../Topbar/Topbar";
// import Cards from "../../Book_Cards/Cards";
// import axios from "axios";

// function Wishlist() {
//   const userDataString = localStorage.getItem("user");
//   var userData;
//   if (userDataString) {
//     userData = JSON.parse(userDataString);
//   }

//   const [wishlistItems, setWishlistItems] = useState([]);

//   useEffect(() => {
//     async function fetchWishlistItems() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/wishlist-books"
//         );
//         setWishlistItems(response.data);
//       } catch (error) {
//         console.error("Error fetching wishlist items:", error);
//       }
//     }

//     fetchWishlistItems();
//   }, []); // This should only run once when the component mounts

//   // Now you have all wishlist items in the `wishlistItems` state
//   // You can filter them based on the user's email
// const filteredBooks = wishlistItems.filter(
//   (item) => item.userId === userData.email
// );

//   const [booksData, setBooksData] = useState([]);

//   useEffect(() => {
//     async function fetchBooksData() {
//       try {
//         const response = await axios.get("http://localhost:5000/get-books");
//         const allBooks = response.data;
//         console.log("got books : ",allBooks);
//         // Use filter to select books whose IDs are in filteredBooks
//         const selectedBooksData = allBooks.filter((book) =>
//           filteredBooks.some((filteredBook) => filteredBook.bookId === book._id)
//         );

//         setBooksData(selectedBooksData);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     }

//     fetchBooksData();
//   }, []);
//   console.log('filterd books : ',filteredBooks);
//   console.log('all books : ',booksData);
//   return (
//     <div>
//       <Topbar />
//       <h1>This is the Wishlist Page.</h1>
//       <div className="col-lg-11 col-md-11 col-sm-11">
//           <div className="cards-section">
//             <div className="row">
//               {booksData.map((x) => (
//                 <div className="col-lg-4 col-md-6 col-sm-12 card-books">
//                   <Cards
//                     bookId={x._id}
//                     title={x.title}
//                     author={x.author}
//                     language={x.language}
//                     price={x.price}
//                     img={`http://localhost:5000/${x.bookImage}`}
//                     posted_by={x.posted_by}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }

// export default Wishlist;

// import React, { useEffect, useState } from "react";
// import Topbar from "../../Topbar/Topbar";
// import Cards from "../../Book_Cards/Cards";
// import axios from "axios";

// function Wishlist() {
//   const userDataString = localStorage.getItem("user");
//   var userData;
//   if (userDataString) {
//     userData = JSON.parse(userDataString);
//   }

//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [booksData, setBooksData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchWishlistItems() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/wishlist-books"
//         );
//         setWishlistItems(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     }

//     fetchWishlistItems();
//   }, []); // This should only run once when the component mounts

//   useEffect(() => {
//     async function fetchBooksData() {
//       try {
//         const response = await axios.get("http://localhost:5000/get-books");
//         const allBooks = response.data;
//         console.log("Got books : ", allBooks);
//         // Use filter to select books whose IDs are in filteredBooks
//         const selectedBooksData = allBooks.filter((book) =>
//           wishlistItems.some(
//             (wishlistItem) =>
//               wishlistItem.bookId.toString() === book._id.toString()
//           )
//         );

//         setBooksData(selectedBooksData);
//         setLoading(false); // Set loading to false when data is loaded
//       } catch (error) {
//         setError(error);
//       }
//     }

//     // Fetch books data when `wishlistItems` changes
//     if (wishlistItems.length > 0) {
//       fetchBooksData();
//     }
//   }, [wishlistItems]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   console.log("wishlistItems : ", wishlistItems);
//   console.log("booksData : ", booksData);

//   return (
//     <div>
//       <Topbar />
//       <h1>This is the Wishlist Page.</h1>
//       <div className="col-lg-11 col-md-11 col-sm-11">
//         <div className="cards-section">
//           <div className="row">
//             {booksData.map((x) => (
//               <div
//                 className="col-lg-4 col-md-6 col-sm-12 card-books"
//                 key={x._id}
//               >
//                 <Cards
//                   bookId={x._id}
//                   title={x.title}
//                   author={x.author}
//                   language={x.language}
//                   price={x.price}
//                   img={`http://localhost:5000/${x.bookImage}`}
//                   posted_by={x.posted_by}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Wishlist;

import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Topbar from "../../Topbar/Topbar";
import Cards from "../../Book_Cards/Cards";
import axios from "axios";

function Wishlist() {
  const userDataString = localStorage.getItem("user");
  var userData;
  if (userDataString) {
    userData = JSON.parse(userDataString);
  }

  const [wishlistItems, setWishlistItems] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchedBook, setSearchedBook] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: "",
    maxPrice: "",
    language: "",
  });

  useEffect(() => {
    async function fetchWishlistItems() {
      try {
        const response = await axios.get(
          "http://localhost:5000/wishlist-books"
        );
        setWishlistItems(response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchWishlistItems();
  }, []); // This should only run once when the component mounts

  async function fetchBooksData() {
    try {
      const response = await axios.get("http://localhost:5000/get-books");
      const allBooks = response.data;
      console.log("Got books : ", allBooks);

      // Filter wishlist items for the current user
      const filteredBooks = wishlistItems.filter(
        (item) => item.userId === userData.email
      );

      // Use filter to select books whose IDs are in filteredBooks
      const selectedBooksData = allBooks.filter((book) =>
        filteredBooks.some(
          (wishlistItem) =>
            wishlistItem.bookId.toString() === book._id.toString()
        )
      );

      setBooksData(selectedBooksData);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    // Fetch books data when `wishlistItems` or `userData` changes
    if (wishlistItems.length > 0) {
      fetchBooksData();
    }
  }, [wishlistItems, userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function handleRemoveFromWishlist(bookId) {
    var answer = window.confirm("Are you sure you want to delete the book?");
    if (answer) {
      try {
        const response = await axios.delete(
          "http://localhost:5000/wishlist/delete",
          {
            data: {
              userId: userData.email,
              bookId: bookId,
            },
          }
        );
        // Update the wishlistItems state to reflect the changes
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.bookId !== bookId)
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error removing book from wishlist:", error);
      }
      console.log("delete book Id is : ", bookId);
    } else {
      //some code
      console.log("NO");
    }
    // try {
    //   const response = await axios.delete(
    //     "http://localhost:5000/wishlist/delete",
    //     {
    //       data: {
    //         userId: userData.email,
    //         bookId: bookId,
    //       },
    //     }
    //   );
    //   // Update the wishlistItems state to reflect the changes
    //   setWishlistItems((prevItems) =>
    //     prevItems.filter((item) => item.bookId !== bookId)
    //   );
    //   console.log(response.data.message);
    // } catch (error) {
    //   console.error("Error removing book from wishlist:", error);
    // }
    // console.log("delete book Id is : ", bookId);
  }

  console.log("wishlistItems : ", wishlistItems);
  console.log("booksData : ", booksData);

  const searchBookById = (bookName) => {
    const foundBook = booksData.find(
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

  const onFilterChange = (filterCriteria) => {
    const { minPrice, maxPrice, language } = filterCriteria;
    const filteredBooks = filterBooks(booksData, filterCriteria);
    console.log("Filter criteria:", filterCriteria);
    setBooksData(filteredBooks);
    setFilterCriteria(filterCriteria);
  };

  const onClearFilters = () => {
    setFilterCriteria({
      minPrice: "",
      maxPrice: "",
      language: "",
      location: "",
    });
    fetchBooksData();
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
    // Case 1: Only price filter is provided
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

    // Case 4: No filters are provided, return all books
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
                    delete={true}
                    deleteFunction={handleRemoveFromWishlist}
                  />
                </div>
              ) : (
                booksData.map((x) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 card-books"
                    key={x._id}
                  >
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
                      deleteFunction={handleRemoveFromWishlist}
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

export default Wishlist;
