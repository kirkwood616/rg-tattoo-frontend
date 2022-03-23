import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import AdminMenu from "../admin/menu/AdminMenu";
import MenuHamburger from "./MenuHamburger";
import "./NavMenu.css";
import UserMenu from "./UserMenu";

function NavMenu() {
  // CONTEXT
  let { user } = useContext(AppContext);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (): void => {
      if (dropdownRef.current !== null) setIsActive(!isActive);
    };

    if (isActive) window.addEventListener("click", pageClickEvent);

    return () => window.removeEventListener("click", pageClickEvent);
  }, [isActive]);

  return (
    <div className="NavMenu">
      <div className="nav-container">
        <button onClick={onClick} className={isActive ? "menu-trigger active" : "menu-trigger"}>
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
