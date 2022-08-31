import Header from "components/Header";
import AppContext from "context/AppContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";

function AdminContainer() {
  const { user } = useContext(AppContext);

  return (
    <>
      {user && <Header />}
      <Outlet />
    </>
  );
}

export default AdminContainer;
