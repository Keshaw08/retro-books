import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "./Login.css";
import Register from "./Register";

export default function Login() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text

    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        window.location.href = "/auth";
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
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary">
              <a href="/register">Sign Up</a>
              </span>
            </div>
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
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Log In
              </button>
            </div>
            <p className="forgot-password text-right mt-3">
              Forgot <a href="#">password?</a>
            </p>

            {login ? (
              <p className="text-success d-grid gap-2 mt-3">You Are Logged in Successfully</p>
            ) : (
              <p className="text-danger d-grid gap-2 mt-3"> </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
