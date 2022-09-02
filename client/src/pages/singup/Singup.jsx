import React from "react";
import "./singup.css";
import { useState, useEffect, useLocation } from "react";
import axios from "axios";

export default function Singup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/singup/", {
        username,
        email,
        password,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singup">
      <div className="logo">
        <img src="./images/Dhaqaal.png" alt="" className="logo-img" />
      </div>
      <div className="singup-allform" onSubmit={handleSubmit}>
        <form className="singup-form">
          <span className="span">username</span>
          <input
            type="text"
            className="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="span">Email</span>
          <input
            type="email
          "
            className="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className="span">password</span>
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            {" "}
            Singup
          </button>
          <span className="singup-login">log in</span>
        </form>
      </div>
    </div>
  );
}
