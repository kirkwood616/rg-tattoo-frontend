import AdminMenu from "admin/components/menu/AdminMenu";
import useAuthCheck from "hooks/useAuthCheck";
import useLocationRoute from "hooks/useLocationRoute";
import { useEffect, useRef, useState } from "react";
import { toggleBooleanState } from "utils/Toggle";
import MenuHamburger from "./MenuHamburger";
import "./NavMenu.css";
import UserMenu from "./UserMenu";

function NavMenu() {
  const { user, setUser } = useAuthCheck();
  const { isAdmin, pathname } = useLocationRoute();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function pageClickEvent(): void {
      if (dropdownRef.current !== null) setIsMenuActive(!isMenuActive);
      else return;
    }
    if (isMenuActive) window.addEventListener("click", pageClickEvent);
    if (isMenuActive && pathname === "/user/login") setIsMenuActive((current) => !current);
    return () => window.removeEventListener("click", pageClickEvent);
  }, [isMenuActive, pathname]);

  return (
    <div className="NavMenu">
      <div className="nav-container">
        <button
          onClick={() => toggleBooleanState(setIsMenuActive)}
          className={isMenuActive ? "menu-trigger active" : "menu-trigger"}
        >
          <MenuHamburger isActive={isMenuActive} />
        </button>
        <nav ref={dropdownRef} className={`menu ${isMenuActive ? "active" : "inactive"}`}>
          {user && isAdmin ? <AdminMenu setUser={setUser} /> : <UserMenu />}
        </nav>
      </div>
    </div>
  );
}

export default NavMenu;
