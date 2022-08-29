import { useContext, useEffect, useRef, useState } from "react";
import AdminContext from "../../context/AdminContext";
import AppContext from "../../context/AppContext";
import AdminMenu from "../admin/menu/AdminMenu";
import MenuHamburger from "./MenuHamburger";
import "./NavMenu.css";
import UserMenu from "./UserMenu";

function NavMenu() {
  // CONTEXT
  const { user } = useContext(AppContext);
  const { appointmentRequests } = useContext(AdminContext);

  // STATE
  const [isActive, setIsActive] = useState(false);

  // REF
  const dropdownRef = useRef(null);

  // ON-CLICKS
  const onClick = () => setIsActive((prev) => !prev);

  useEffect(() => {
    const pageClickEvent = (): void => {
      if (dropdownRef.current !== null) setIsActive(!isActive);
      else return;
    };

    if (isActive) window.addEventListener("click", pageClickEvent);

    return () => window.removeEventListener("click", pageClickEvent);
  }, [isActive]);

  return (
    <div className="NavMenu">
      <div className="nav-container">
        <button onClick={onClick} className={isActive ? "menu-trigger active" : "menu-trigger"}>
          {/* {user && appointmentRequests.length > 0 ? <RequestIcon /> : ""} */}
          <MenuHamburger isActive={isActive} />
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
          {user ? <AdminMenu /> : <UserMenu />}
        </nav>
      </div>
    </div>
  );
}

export default NavMenu;
