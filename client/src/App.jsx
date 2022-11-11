import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AllRoutes from "./components/Routes/AllRoutes";

import { getClientId } from "./utils/getClientId";

function App() {
  const getLoginResponse = (response) => {
    console.log("EncodedToken", response.credential);
  };
  useEffect(() => {
    //script loaded from google authentication
    /*google global*/
    google.accounts.id.initialize({
      client_id: getClientId(),
      callback: getLoginResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
      text: "sign_in_with",
    });
    google.accounts.id.renderButton(document.getElementById("google-login-2"), {
      theme: "outline",
      size: "large",
      text: "signup_with",
    });
  }, []);
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
