import React from "react";
import TopbarSeller from "../../Topbar/TopbarSeller";
import BookForm from "./BookForm";

function PostBooks() {
  return (
    <div>
      <TopbarSeller />
      {/* <h1> This is a Seller Page. Post Books Here. </h1> */}
      <BookForm />
    </div>
  );
}

export default PostBooks;
