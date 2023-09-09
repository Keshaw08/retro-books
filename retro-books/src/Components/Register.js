import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:3000/register",
      data: {
        name,
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
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
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary">
              <a href="/login">Sign In</a>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="name"
                className="form-control mt-1"
                value={name}
            	onChange={(e) => setName(e.target.value)}
            	placeholder="Enter Full Name"
              />
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
                Register
              </button>
            </div>
            {register ? (
          <p className="text-success d-grid gap-2 mt-3">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger d-grid gap-2 mt-3"> </p>
        )}
          </div>
        </form>
      </div>
    </>
  );
}
