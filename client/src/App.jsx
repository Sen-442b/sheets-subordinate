import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import AllRoutes from "./components/Routes/AllRoutes";
import { getClientId } from "./utils/getClientId";
import { GClientContext } from "./components/Contexts/GoogleClientContextProvider";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { UsersDataContext } from "./components/Contexts/UsersDataProvider";

const scopes =
  "https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/spreadsheets.readonly";
function App() {
  const { dispatch } = useContext(UsersDataContext);
  const getLoginResponse = (response) => {};
  const { setGoogleInstances } = useContext(GClientContext);
  useEffect(() => {
    //script loaded from google authentication
    /*google global*/
    const google = window.google;
    google.accounts.id.initialize({
      client_id: getClientId(),
      callback: getLoginResponse,
    });
    /*
    google.accounts.id.renderButton(document.getElementById("google-login"), {
      theme: "outline",
      size: "large",
      text: "sign_in_with",
    });
    */

    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: getClientId(),
      scope: scopes,
      callback: (tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          setGoogleInstances((prevObj) => ({
            ...prevObj,
            accessToken: tokenResponse.access_token,
          }));
          const getUserSpreadSheetsMetaData = axios.get(
            "https://www.googleapis.com/drive/v3/files",
            {
              params: {
                // prettier-ignore
                q:'mimeType=\'application/vnd.google-apps.spreadsheet\'',
              },
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            }
          );
          const getUserEmail = axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            }
          );

          Promise.all([getUserEmail, getUserSpreadSheetsMetaData])
            .then((responses) => {
              const userInfo = responses[0].data;
              const spreadSheetsMetaData = responses[1].data.files;
              dispatch({
                type: "ADD_USER_DATA",
                payload: {
                  id: userInfo.id,
                  email: userInfo.email,
                  picture: userInfo.picture,
                  name: userInfo.given_name,

                  spreadSheetsMetaData,
                },
              });
            })
            .catch((err) => {
              console.log(err);
            });
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
