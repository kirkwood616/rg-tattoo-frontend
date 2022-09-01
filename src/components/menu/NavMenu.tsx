import AdminMenu from "admin/components/menu/AdminMenu";
import useLocationRoute from "admin/hooks/useLocationRoute";
import useAuthCheck from "hooks/useAuthCheck";
import { useEffect, useRef, useState } from "react";
import MenuHamburger from "./MenuHamburger";
import "./NavMenu.css";
import UserMenu from "./UserMenu";

function NavMenu() {
  // AUTH
  const { user, setUser } = useAuthCheck();

  // LOCATION
  const { isAdmin } = useLocationRoute();

  // STATE
  const [isActive, setIsActive] = useState(false);

  // REF
  const dropdownRef = useRef(null);

  // ON-CLICK
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
          <MenuHamburger isActive={isActive} />
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`}>
          {user && isAdmin ? <AdminMenu setUser={setUser} /> : <UserMenu />}
        </nav>
      </div>
    </div>
  );
}

export default NavMenu;
