import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Contexts/AuthContextProvider";
import { loginService } from "../../services/authServices";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { setAuthenticatedUserData } = useContext(AuthContext);

  const inputDataHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prevObj) => ({ ...prevObj, [name]: value }));
  };

  const loginHandler = async (userData) => {
    try {
      const response = await loginService(userData);
      const { data } = response;
      localStorage.setItem("persistedUserData", JSON.stringify(data));
      setAuthenticatedUserData(data);

      navigate("/subscriptions");
    } catch (error) {
      console.log(error);
    }
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    loginHandler(userData);
  };
  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={(event) => loginSubmitHandler(event, userData)}>
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

export default Login;
