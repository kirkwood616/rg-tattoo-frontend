import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminContextProvider from "../../context/AdminContextProvider";
import AppContext from "../../context/AppContext";
import Header from "../Header";

function AdminContainer() {
  let { user } = useContext(AppContext);

  return (
    <AdminContextProvider>
      {user && <Header />}
      <Outlet />
    </AdminContextProvider>
  );
}

export default AdminContainer;
