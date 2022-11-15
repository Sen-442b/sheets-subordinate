import React, { useContext } from "react";
import { SelectedSheetsContext } from "../../components/Contexts/SelectedSheetsContextProvider";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
const Dashboard = () => {
  const { selectedSheetsData } = useContext(SelectedSheetsContext);
  const sheetsNamesArr = selectedSheetsData.reduce(
    (acc, cv) => [...acc, `${cv.sheetName} (${cv.sheetTabName}) `],
    []
  );
  const sheetsTotalColumnsArr = selectedSheetsData.reduce(
    (acc, cv) => [...acc, cv.sheetTotalColumns],
    []
  );
  const sortedSheetsTotalColumnsArr = sheetsTotalColumnsArr.sort(
    (numOne, numTwo) => numOne - numTwo
  );
  console.log(sortedSheetsTotalColumnsArr);
  return (
    <div>
      <h1>Spreadsheet Columns Dashboard</h1>
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: sheetsNamesArr,
            datasets: [
              {
                // Label for bars
                label: "total column count",
                // Data or value of your each variable
                data: sheetsTotalColumnsArr,
                // Color of each bar
                backgroundColor: ["#2a5876e6"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
