import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Header from "../Header";

function AdminContainer() {
  let { user } = useContext(AppContext);

  return (
    <>
      {user && <Header />}
      <Outlet />
    </>
  );
}

export default AdminContainer;
