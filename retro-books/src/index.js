import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import { UserProvider } from "./Components/Registration_Login/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <UserProvider> */}
        <App />
      {/* </UserProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
