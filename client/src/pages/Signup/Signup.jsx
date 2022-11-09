import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Contexts/AuthContextProvider";
import { signupService } from "../../services/authServices";

const Signup = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { setAuthenticatedUserData } = useContext(AuthContext);

  const inputDataHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prevObj) => ({ ...prevObj, [name]: value }));
  };

  const signupHandler = async (userData) => {
    try {
      const response = await signupService(userData);
      const { data } = response;
      localStorage.setItem("persistedUserData", JSON.stringify(data));
      setAuthenticatedUserData(data);

      navigate("/subscriptions");
    } catch (error) {
      console.log(error);
    }
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();
    signupHandler(userData);
  };
  return (
    <div className="auth-container">
      <h1>Sign up</h1>
      <form onSubmit={(event) => signupSubmitHandler(event, userData)}>
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
