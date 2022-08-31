import AppContext from "context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminMenu() {
  // CONTEXT
  const { setUser, setIsLoading } = useContext(AppContext);

  const navigate = useNavigate();

  // LOGOUT
  async function logOut() {
    setIsLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setUser(null);
      navigate("/login");
    }
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
