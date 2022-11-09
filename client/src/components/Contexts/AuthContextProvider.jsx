import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authenticatedUserData, setAuthenticatedUserData] = useState({});
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
