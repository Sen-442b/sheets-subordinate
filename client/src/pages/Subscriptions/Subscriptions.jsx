import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import { GClientContext } from "../../components/Contexts/GoogleClientContextProvider";
import { clientId } from "../../devEnv";
import { getClientId } from "../../utils/getClientId";

const Subscriptions = () => {
  const { googleInstances } = useContext(GClientContext);
  const { tokenClient } = googleInstances;
  const onLoginSuccess = (res) => {
    console.log("Login Success, User", res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log("On login failure", res);
  };

  const readDriveData = () => {
    tokenClient.requestAccessToken();
  };
  return (
    <div>
      <div id="google-login"></div>
      <button onClick={readDriveData}>Google Drive </button>
    </div>
  );
};

export default Subscriptions;
