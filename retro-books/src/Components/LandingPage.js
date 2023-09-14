import React from "react";
import logo from "./Assets/logo.png";
import pic2 from "./Assets/pic2.png";
import "./Landingpage.css";

export default function LandingPage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img
            src={logo}
            alt="logo of retro books"
            
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="rest-nav">
              <button type="button" className="btn btn-outline-light">
                Log In
              </button>
            </div>
            <div className="rest-nav">
              <button type="button" className="btn btn-outline-secondary">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* <hr /> */}

      <div className="Container-fluid title-cover-photo">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 part-1">
            <p className="part-1-name"> Retro Books</p>
            <p className="tagline"> From Shelf to Sale: Your Premier Book Marketplace.</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 part-2">
            <img src={pic2} alt="" className="cover-photo img-fluid mx-auto d-block"/>
          </div>
        </div>
      </div>

      {/* <h1 className="text-center">Landing Page</h1>

      <section className="text-center" id="navigation">
        <a href="/">Home</a>
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </section> */}
    </div>
  );
}
