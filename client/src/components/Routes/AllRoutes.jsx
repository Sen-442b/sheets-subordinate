import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../../App";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Subscriptions from "../../pages/Subscriptions/Subscriptions";
import PrivateRoute from "./PrivateRoute";

import PublicRoute from "./PublicRoute";
const AllRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <PrivateRoute>
            <Subscriptions />
          </PrivateRoute>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AllRoutes;
