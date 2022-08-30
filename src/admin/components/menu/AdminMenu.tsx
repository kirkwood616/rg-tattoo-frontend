import AppContext from "context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useContext } from "react";
import { Link } from "react-router-dom";

function AdminMenu() {
  // CONTEXT
  const { setUser } = useContext(AppContext);

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
          <Link to={"/admin/appointment-requests"}>APPOINTMENT REQUESTS</Link>
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
