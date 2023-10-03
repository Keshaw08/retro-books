import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user information from localStorage or perform any other necessary logout actions.
    localStorage.removeItem("user");

    // Redirect to the login page after logout.
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline-danger" role="button">
      Logout
    </button>
  );
}

export default LogoutButton;
