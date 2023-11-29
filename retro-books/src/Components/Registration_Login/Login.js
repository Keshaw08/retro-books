import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";
import logo from "../Assets/logo.png";

export default function Login() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        window.location.href = "/home";
        localStorage.setItem("user", JSON.stringify({ ...result.user, email }));
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <div className="login-page">
      <div className="Auth-form-container d-flex justify-content-center">
        <form className="Auth-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="Auth-form-content">
            <div className="logo">
              <img src={logo} className="img-fluid" alt="..." />
            </div>
            <h3 className="Auth-form-title">Sign In</h3>
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
                Log In
              </button>
            </div>
            <div className="text-right mt-4">
              Not registered yet ?{" "}
              <span className="link-primary">
                <a className="link" href="/register">
                  Sign Up
                </a>
              </span>
            </div>

            {_login ? (
              <p className="text-success d-grid gap-2 mt-3">
                You Are Logged in Successfully
              </p>
            ) : (
              <p className="text-danger d-grid gap-2 mt-3"> </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
