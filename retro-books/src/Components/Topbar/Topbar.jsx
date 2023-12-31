import React from "react";
import LogoutButton from "../Registration_Login/LogoutButton";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import "./Topbar.css";

function Topbar(props) {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToWishlist = () => {
    navigate("/wishlist");
  };
  const navigateToSeller = () => {
    navigate("/seller");
  };

  const navigateToBuyerMessages = () => {
    navigate("/buyer-messages");
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    props.searchFunction(searchValue);
  };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <img
          src={logo}
          alt="logo of retro books"
          onClick={navigateToHome}
          className="d-inline-block align-text-top logo_nav"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse navbar-collapse-topbar"
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link anchor"
                aria-current="page"
                onClick={navigateToHome}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link anchor" onClick={navigateToWishlist}>
                Wishlist
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link anchor" onClick={navigateToBuyerMessages}>
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link anchor" onClick={navigateToSeller}>
                Be a Seller
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
