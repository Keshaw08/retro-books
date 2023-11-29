import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-outline-danger"
      role="button"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
