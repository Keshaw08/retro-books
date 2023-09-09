import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import FreeComponent from "./Components/FreeComponent";

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<FreeComponent />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
