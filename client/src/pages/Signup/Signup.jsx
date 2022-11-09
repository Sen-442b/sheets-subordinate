import { Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const [userData, setUserData] = useState({});
  const inputDataHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prevObj) => ({ ...prevObj, [name]: value }));
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="auth-container">
      <h1>Sign up</h1>
      <form onSubmit={signupSubmitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={inputDataHandler}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={inputDataHandler}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Signup;
