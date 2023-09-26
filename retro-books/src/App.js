import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import Register from "./Components/Registration_Login/Register";
import Login from "./Components/Registration_Login/Login";
import LandingPage from "./Components/LandingPage";
import FirstPage from "./Components/Pages/Buyer/FirstPage";
import Wishlist from "./Components/Pages/Buyer/Wishlist";
import PostBooks from "./Components/Pages/Seller/PostBooks";
import PostedBooks from "./Components/Pages/Seller/PostedBooks";

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
            <PostBooks />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/postedbooks"
        element={
          <ProtectedRoutes>
            <PostedBooks />
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
