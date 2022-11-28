import { requestTypes } from "admin/settings/AdminSettings";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./AppointmentRequestMenu.css";

function AppointmentRequestMenu() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div
      className={isMenuActive ? "menu-container" : "menu-container menu-container_hide"}
      onClick={() => setIsMenuActive((current) => !current)}
    >
      <div
        className={isMenuActive ? "requests-menu open" : "requests-menu"}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuActive((prev) => !prev);
        }}
      >
        <div className="requests-menu_title">REQUESTS MENU</div>
        <div className={isMenuActive ? "requests-menu-list active" : "requests-menu-list inactive"}>
          <Link to={"./"}>
            <button className="menu-link">MAIN</button>
          </Link>
          <Link to={"search"}>
            <button className="menu-link">SEARCH</button>
          </Link>
          {requestTypes.map((request, index) => (
            <Link to={request.path} key={request.name + index}>
              <button className="menu-link" value={request.name}>
                {request.name.toUpperCase()}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentRequestMenu;
