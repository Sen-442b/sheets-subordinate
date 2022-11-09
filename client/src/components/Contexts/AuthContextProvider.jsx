import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const INITIAL_STATE = { username: "", accessToken: "" };
const AuthContextProvider = ({ children }) => {
  const [authenticatedUserData, setAuthenticatedUserData] =
    useState(INITIAL_STATE);
  useEffect(() => {
    const persistedUserData = JSON.parse(
      localStorage.getItem("persistedUserData")
    );
    setAuthenticatedUserData(persistedUserData);
  }, []);
  return (
    <AuthContext.Provider
      value={{ authenticatedUserData, setAuthenticatedUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
