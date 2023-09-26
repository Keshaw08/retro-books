import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./Login.css";
import logo from "../Assets/logo.png";
import { useUser } from './UserContext';

export default function Login() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_login, setLogin] = useState(false);
  const { login } = useUser();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        email,
        password,
      },
    };

    const userId = configuration.data.email;
    login(userId);
    // make the API call

    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/home";
        // localStorage.setItem('user',JSON.stringify({...result.user,email}))
        
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
            {/* <div className="text-center">
              Not registered yet ?{" "}
              <span className="link-primary">
                <a className="link" href="/register">Sign Up</a>
              </span>
            </div> */}
            <div className="form-group mt-3">
              <label>Email address</label>
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
            {/* <p className="forgot-password text-right mt-3">
              Forgot <a href="/register" className="forgot-password">password ?</a>
            </p> */}
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
