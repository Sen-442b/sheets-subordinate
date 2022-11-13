import React, { createContext, useReducer } from "react";

export const UsersDataContext = createContext();

/*
Manual type checking
type usersDataObj={
  email:email,
  picture:String,
  spreadSheetsMetaData:[]


}
type initialState =usersDataObj[]

*/
const usersDataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_DATA":
      console.log(action.payload);
      return [...state, action.payload];
  }
};

const UsersDataProvider = ({ children }) => {
  const [usersDataState, dispatch] = useReducer(usersDataReducer, []);
  return (
    <UsersDataContext.Provider value={{ usersDataState, dispatch }}>
      {children}
    </UsersDataContext.Provider>
  );
};

export default UsersDataProvider;
