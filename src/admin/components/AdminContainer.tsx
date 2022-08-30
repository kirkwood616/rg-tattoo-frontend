import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import AppContext from "../../context/AppContext";

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
