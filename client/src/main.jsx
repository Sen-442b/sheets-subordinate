import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./components/Contexts/AuthContextProvider";
import GoogleClientContextProvider from "./components/Contexts/GoogleClientContextProvider";
import SelectedSheetsContextProvider from "./components/Contexts/SelectedSheetsContextProvider";
import UsersDataProvider from "./components/Contexts/UsersDataProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleClientContextProvider>
        <AuthContextProvider>
          <UsersDataProvider>
            <SelectedSheetsContextProvider>
              <App />
            </SelectedSheetsContextProvider>
          </UsersDataProvider>
        </AuthContextProvider>
      </GoogleClientContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
