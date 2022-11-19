import AdminMenu from "admin/components/menu/AdminMenu";
import useLocationRoute from "admin/hooks/useLocationRoute";
import useAuthCheck from "hooks/useAuthCheck";
import { useEffect, useRef, useState } from "react";
import MenuHamburger from "./MenuHamburger";
import "./NavMenu.css";
import UserMenu from "./UserMenu";

function NavMenu() {
  const { user, setUser } = useAuthCheck();
  const { isAdmin, pathname } = useLocationRoute();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const dropdownRef = useRef(null);

  const onTriggerClick = () => setIsMenuActive((current) => !current);

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
        <button onClick={onTriggerClick} className={isMenuActive ? "menu-trigger active" : "menu-trigger"}>
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
