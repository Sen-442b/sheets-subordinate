import { Route, Routes, useNavigate } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
const AllRoutes = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={<div onClick={() => navigate("/login")}> Home</div>}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AllRoutes;
