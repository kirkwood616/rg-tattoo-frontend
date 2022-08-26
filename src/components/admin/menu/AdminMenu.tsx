import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../../context/AdminContext";
import AppContext from "../../../context/AppContext";
import { auth } from "../../../firebaseConfig";
import RequestIcon from "./RequestIcon";

function AdminMenu() {
  // CONTEXT
  let { setUser } = useContext(AppContext);
  let { newAppointmentRequests } = useContext(AdminContext);

  // LOGOUT
  async function logOut() {
    await signOut(auth).then(() => setUser(null));
  }

  return (
    <div className="AdminMenu">
      <ul>
        <li>
          <Link to={"/admin/home"}>HOME</Link>
        </li>
        <li>
          <Link to={"/admin/appointment-requests"}>APPOINTMENT REQUESTS {newAppointmentRequests.length > 0 && <RequestIcon />}</Link>
        </li>
        <li>
          <Link to={"/admin/set-available-appointments"}>SET AVAILABLE APPOINTMENTS</Link>
        </li>
        <li onClick={logOut}>
          <Link to={"/login"}>LOG OUT</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminMenu;
