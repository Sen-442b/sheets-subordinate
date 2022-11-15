import React, { useContext, useState } from "react";

import { GClientContext } from "../../components/Contexts/GoogleClientContextProvider";
import { UsersDataContext } from "../../components/Contexts/UsersDataProvider";
import { SheetsForm } from "../../components/SeetsForm/SheetsForm";
import { clientId } from "../../devEnv";
import { getClientId } from "../../utils/getClientId";

const Subscriptions = () => {
  const [isSheetsFormModalOpen, setIsSheetsFormModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const { googleInstances } = useContext(GClientContext);
  const { tokenClient } = googleInstances;
  const { usersDataState } = useContext(UsersDataContext);
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
      {usersDataState.length !== 0 &&
        usersDataState.map((userData) => {
          return (
            <button
              key={userData.id}
              onClick={() => {
                setSelectedUserData((prevObj) => ({ ...prevObj, ...userData }));
                setIsSheetsFormModalOpen(true);
              }}
            >
              {userData.name}
            </button>
          );
        })}
      {isSheetsFormModalOpen && (
        <SheetsForm
          setIsSheetsFormModalOpen={setIsSheetsFormModalOpen}
          selectedUserData={selectedUserData}
        />
      )}
    </div>
  );
};

export default Subscriptions;
