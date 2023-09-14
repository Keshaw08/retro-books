import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Register from "./Components/Registration_Login/Register";
import Login from "./Components/Registration_Login/Login";
import LandingPage from "./Components/LandingPage";
import FirstPage from "./Components/Pages/FirstPage";

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<FirstPage />} />
      </Routes>
  );
}

export default App;
