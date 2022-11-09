import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContextProvider";

const PublicRoute = ({ children }) => {
  const { authenticatedUserData } = useContext(AuthContext);
  const { accessToken } = authenticatedUserData;
  return !accessToken ? children : <Navigate to={-1} />;
};

export default PublicRoute;
