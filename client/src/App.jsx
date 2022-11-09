import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AllRoutes from "./components/Routes/AllRoutes";

function App() {
  useEffect(() => console.log("api call"), []);
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;