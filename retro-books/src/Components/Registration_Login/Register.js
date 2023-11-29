import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import logo from "../Assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: "http://localhost:5000/register",
      data: {
        name,
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setRegister(true);
        navigate("/login");
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <div className="Auth-form-container d-flex justify-content-center">
        <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="Auth-form-content">
            <div className="logo">
              <img src={logo} className="img-fluid" alt="..." />
            </div>
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Name</label>
              <input
                type="name"
                className="form-control mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>
            </div>
            <div className="text-right mt-4">
              Already registered ?{" "}
              <span className="link-primary">
                <a className="link" href="/login">
                  Sign In
                </a>
              </span>
            </div>

            {register ? (
              <p className="text-success d-grid gap-2 mt-3">
                You Are Registered Successfully
              </p>
            ) : (
              <p className="text-danger d-grid gap-2 mt-3"> </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
