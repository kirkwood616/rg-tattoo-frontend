import { useContext } from "react";
import AppContext from "../../context/AppContext";
import AdminPage from "./AdminPage";
// import "./AdminHome.css";

function AdminHome() {
  // CONTEXT
  let { user } = useContext(AppContext);

  return (
    <AdminPage title="Home">
      <div className="AdminHome">
        <h1>ADMIN HOME</h1>
      </div>
    </AdminPage>
  );
}

export default AdminHome;
