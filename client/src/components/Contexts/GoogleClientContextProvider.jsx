import React, { createContext, useState } from "react";

export const GClientContext = createContext();
const GoogleClientContextProvider = ({ children }) => {
  const [googleInstances, setGoogleInstances] = useState({ tokenClient: "" });
  return (
    <GClientContext.Provider value={{ googleInstances, setGoogleInstances }}>
      {children}
    </GClientContext.Provider>
  );
};

export default GoogleClientContextProvider;
