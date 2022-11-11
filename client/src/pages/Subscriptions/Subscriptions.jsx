import React from "react";
import GoogleLogin from "react-google-login";
import { clientId } from "../../devEnv";
import { getClientId } from "../../utils/getClientId";

const Subscriptions = () => {
  const onLoginSuccess = (res) => {
    console.log("Login Success, User", res.profileObj);
  };

  const onLoginFailure = (res) => {
    console.log("On login failure", res);
  };

  return (
    <div>
      <div id="google-login"></div>
    </div>
  );
};

export default Subscriptions;
