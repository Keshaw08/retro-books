import React from "react";
import Topbar from "../Topbar/Topbar";
import Cards from "../Book_Cards/Cards";
import "./FirstPage.css";
import Sidebar from "../Sidebar/Sidebar";

export default function FirstPage() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      {/* <div className="row cards-section">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Cards />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Cards />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Cards />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Cards />
        </div>
      </div> */}
      
    </div>
  );
}
