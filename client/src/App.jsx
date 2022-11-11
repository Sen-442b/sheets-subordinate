import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AllRoutes from "./components/Routes/AllRoutes";

import { getClientId } from "./utils/getClientId";
import { GClientContext } from "./components/Contexts/GoogleClientContextProvider";
import axios from "axios";

const scopes = "https://www.googleapis.com/auth/drive.metadata";
function App() {
  const getLoginResponse = (response) => {
    console.log("EncodedToken", response.credential);
  };
  const { setGoogleInstances } = useContext(GClientContext);
  useEffect(() => {
    //script loaded from google authentication
    /*google global*/
    const google = window.google;
    google.accounts.id.initialize({
      client_id: getClientId(),
      callback: getLoginResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
      text: "sign_in_with",
    });
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: getClientId(),
      scope: scopes,
      callback: (tokenResponse) => {
        //fired after successfully getting api access consent from user
        console.log(tokenResponse);
        if (tokenResponse && tokenResponse.access_token) {
          axios
            .get("https://www.googleapis.com/drive/v3/files", {
              params: {
                // prettier-ignore
                q:'mimeType=\'application/vnd.google-apps.spreadsheet\'',
              },
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }
      },
    });

    setGoogleInstances((prevObj) => ({ ...prevObj, tokenClient }));
  }, []);
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
