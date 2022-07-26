import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../context/AppContext";

function PrivateRoutes() {
  let { user } = useContext(AppContext);

  return user ? <Outlet /> : <Navigate to="/user/login" />;
}

export default PrivateRoutes;
