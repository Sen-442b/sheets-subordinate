import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PrivateRoutes";
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
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/subscriptions"
        element={
          <PrivateRoute>
            <div>Subscriptions</div>
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
