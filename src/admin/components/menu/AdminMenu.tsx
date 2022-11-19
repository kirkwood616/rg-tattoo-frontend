import AreYouSure from "components/modals/AreYouSure";
import AppContext from "context/AppContext";
import { signOut, User } from "firebase/auth";
import { auth } from "firebaseConfig";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  setUser: Dispatch<SetStateAction<User | null>>;
}
function AdminMenu({ setUser }: Props) {
  const [isLogOutActive, setIsLogOutActive] = useState(false);

  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const navigate = useNavigate();

  function onLogOut() {
    toggleModalOpen(setIsLogOutActive);
  }

  async function handleLogOut() {
    toggleLoading();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
      setUser(null);
      navigate("/user/login");
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
        <li
          onClick={(e) => {
            e.stopPropagation();
            onLogOut();
          }}
        >
          <Link to={"#"}>LOG OUT</Link>
        </li>
      </ul>
      {isLogOutActive && (
        <AreYouSure
          isActive={isLogOutActive}
          setIsActive={setIsLogOutActive}
          yesFunction={handleLogOut}
          yesButtonText="YES"
        />
      )}
    </div>
  );
}

export default AdminMenu;
