import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const PrivateRoute = ({ children }) => {
  const { authenticatedUserData } = useContext(AuthContext);

  return authenticatedUserData && authenticatedUserData.accessToken ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
