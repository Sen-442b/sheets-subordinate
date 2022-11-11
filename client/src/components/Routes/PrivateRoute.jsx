import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { authenticatedUserData } = useContext(AuthContext);

  console.log(authenticatedUserData?.accessToken);
  return true ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
