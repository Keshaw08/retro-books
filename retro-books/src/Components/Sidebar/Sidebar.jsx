import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Sidebar.css";
import { BsFilterSquare } from "react-icons/bs";

function Sidebar({ onFilterChange, onClearFilters }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [location, setLocation] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleLanguageChange = (value) => {
    console.log("Selected language:", value);
    setSelectedLanguage(value);
  };

  const applyFilters = () => {
    const minPriceValue = minPrice ? parseFloat(minPrice) : "";
    const maxPriceValue = maxPrice ? parseFloat(maxPrice) : "";

    onFilterChange({
      minPrice: minPriceValue,
      maxPrice: maxPriceValue,
      language: selectedLanguage,
    });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedLanguage("");
    onClearFilters();
  };

  return (
    <div>
      <div className="filter-button">
        <BsFilterSquare
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        />
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Apply Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="filter-section">
            <h6>Price Range:</h6>
            <div className="form__group field">
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="form__field"
                placeholder="Min Price"
              />
              <label htmlFor="minPrice" className="form__label">
                Min Price:
              </label>
            </div>
            <div className="form__group field">
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="form__field"
                placeholder="Min Price"
              />
              <label htmlFor="maxPrice" className="form__label">
                Max Price:
              </label>
            </div>
          </div>
          <div className="filter-section">
            <h6>Choose Language:</h6>

            <div className="dropdown drop-box-button">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedLanguage || "All"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("English")}
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleLanguageChange("Hindi")}
                  >
                    Hindi
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="btn-group apply-clear-button"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
