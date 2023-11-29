import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("form submitted");
      onSearch(searchQuery);
    };

  return (
    <form onSubmit={handleSubmit} className="d-flex" role="search">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleInputChange}
    />
    <button className="btn btn-outline-success" type="submit">
      Search
    </button>
  </form>
  );
}

export default SearchBar;
