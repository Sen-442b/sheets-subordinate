import React, { createContext, useState } from "react";

/*Manual types
type selectedSheetObj={
    sheetName:String,
    sheetTabName:String,
    sheetTotalColumns:Number
}
type selectedSheetsData=selectedSheetObj[] */
export const SelectedSheetsContext = createContext();
const SelectedSheetsContextProvider = ({ children }) => {
  const [selectedSheetsData, setSelectedSheetsData] = useState([]);
  return (
    <SelectedSheetsContext.Provider
      value={{ selectedSheetsData, setSelectedSheetsData }}
    >
      {children}
    </SelectedSheetsContext.Provider>
  );
};

export default SelectedSheetsContextProvider;
