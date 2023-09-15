import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Register from "./Components/Registration_Login/Register";
import Login from "./Components/Registration_Login/Login";
import LandingPage from "./Components/LandingPage";
import FirstPage from "./Components/Pages/FirstPage";
import Wishlist from "./Components/Pages/Wishlist";
import SellerPage from "./Components/Pages/SellerPage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoutes>
            <FirstPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/seller"
        element={
          <ProtectedRoutes>
            <SellerPage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
