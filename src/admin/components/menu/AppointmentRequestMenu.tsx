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
        REQUESTS MENU
        <div className={isMenuActive ? "requests-menu-list active" : "requests-menu-list inactive"}>
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
