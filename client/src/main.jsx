import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./components/Contexts/AuthContextProvider";
import GoogleClientContextProvider from "./components/Contexts/GoogleClientContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleClientContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </GoogleClientContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
