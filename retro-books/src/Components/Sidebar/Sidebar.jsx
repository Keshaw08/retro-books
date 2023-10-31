import React, { useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Sidebar.css";
import t from "../Assets/t.png";

function Sidebar({ onFilterChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const applyPriceFilter = () => {
    onFilterChange({
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    });
  };
  return (
    <div>
      <SideNav
        onSelect={(selected) => {
          // Add your code here
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText className="side-nav-text">Home</NavText>
          </NavItem>
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText className="side-nav-text">Wishlist</NavText>
          </NavItem>
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText className="side-nav-text">Price Filter</NavText>
            {/* <div className="price-filter-inputs">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
              <button onClick={applyPriceFilter}>Apply</button>
            </div> */}
          </NavItem>
          {/* <NavItem eventKey="charts">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText className="side-nav-text">Charts</NavText>
          
          </NavItem> */}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default Sidebar;
