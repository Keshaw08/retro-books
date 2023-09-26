import React, { useState, useEffect } from "react";
import axios from "axios";

import TopbarSeller from "../../Topbar/TopbarSeller";

function PostedBooks() {
  return (
    <div>
      <TopbarSeller />
      <h1>All books you posted are here.</h1>
    </div>
  );
}

export default PostedBooks;
