import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GClientContext } from "../Contexts/GoogleClientContextProvider";
import { SelectedSheetsContext } from "../Contexts/SelectedSheetsContextProvider";

/*manual types
type tabObj={tabId:String ,tabTittle:String}

type tabList = tabObj[] 
*/
export const SheetsForm = (props) => {
  const { setIsSheetsFormModalOpen, selectedUserData } = props;
  const { name, spreadSheetsMetaData } = selectedUserData;

  const [selectedSheetId, setSelectedSheetId] = useState("");
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [tabList, setTabList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const { googleInstances } = useContext(GClientContext);
  const { setSelectedSheetsData } = useContext(SelectedSheetsContext);
  const { accessToken } = googleInstances;

  useEffect(() => {
    //TODO : debounce the effect
    if (selectedSheetId) {
      setTabList([]);
      axios
        .get(
          `https://sheets.googleapis.com/v4/spreadsheets/${selectedSheetId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        .then((res) => {
          const tabsData = res.data.sheets;
          const tabNameAndIdList = tabsData.map((tabData) => ({
            tabId: tabData.properties.sheetId,
            tabTitle: tabData.properties.title,
          }));
          setSelectedTab(tabsData[0].properties.title);
          setTabList(tabNameAndIdList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSheetId]);
  const getSheetNameAndId = (sheet) => {
    return sheet.reduce(
      (acc, cv) => [...acc, { sheetName: cv.name, sheetId: cv.id }],
      []
    );
  };

  const sheetSelectInputHandler = (event) => {
    const eventValueObj = JSON.parse(event.target.value);

    setSelectedSheetId(eventValueObj.sheetId);
    setSelectedSheetName(eventValueObj.sheetName);
  };
  const tabSelectInputHandler = (event) => {
    setSelectedTab(event.target.value);
  };

  const sheetsFormSubmitEventHandler = (event) => {
    event.preventDefault();
    const range = `${selectedTab}!1:1`; //select all the cells of first row
    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${selectedSheetId}/values/${range}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        const firstRowArr = res.data.values[0];

        const sheetTotalColumns = firstRowArr.reduce(
          (acc, cv) => (cv !== "" ? ++acc : acc),
          0
        );

        setSelectedSheetsData((prevArr) => [
          ...prevArr,
          {
            sheetName: selectedSheetName,
            sheetTabName: selectedTab,
            sheetTotalColumns,
          },
        ]);
      });
    setIsSheetsFormModalOpen(false);
  };
  return (
    <>
      <div
        className="modal-wrapper"
        onClick={(e) => {
          setIsSheetsFormModalOpen(false);
          e.stopPropagation();
        }}
      >
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <form
            className="flex-center flex-column"
            onSubmit={sheetsFormSubmitEventHandler}
          >
            <h1>User: {name}</h1>
            <label htmlFor="sheet-select">Sheet</label>
            <select
              name="sheet-select"
              id="sheet-select"
              className="select-primary"
              onChange={sheetSelectInputHandler}
              defaultValue={"default"}
            >
              <option value="default" key="lorem-ipsum" disabled>
                Select an Option
              </option>
              {getSheetNameAndId(spreadSheetsMetaData).map((sheetMetaData) => {
                const { sheetName, sheetId } = sheetMetaData;
                return (
                  <>
                    <option
                      value={JSON.stringify(sheetMetaData)}
                      key={sheetId}
                      id={sheetName}
                    >
                      {sheetName}
                    </option>
                  </>
                );
              })}
            </select>
            <label
              htmlFor="tab-select"
              className={
                tabList.length !== 0
                  ? "visibility-visible"
                  : "visibility-hidden"
              }
            >
              Tab
            </label>
            <select
              name="tab-select"
              id="tab-select"
              className={`select-primary ${
                tabList.length !== 0
                  ? "visibility-visible"
                  : "visibility-hidden"
              }`}
              onChange={tabSelectInputHandler}
            >
              {tabList.length !== 0 &&
                tabList.map((tabData) => {
                  const { tabId, tabTitle } = tabData;

                  return (
                    <option value={tabTitle} key={tabId} id={tabTitle}>
                      {tabTitle}
                    </option>
                  );
                })}
            </select>
            <input
              type="submit"
              value="Add to Dashboard"
              className="btn bt-primary"
            />
          </form>
        </div>
      </div>
    </>
  );
};
