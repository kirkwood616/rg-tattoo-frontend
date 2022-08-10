import { useState } from "react";
import { Link } from "react-router-dom";
import { requestTypes } from "../../admin/AdminSettings";
import "./AppointmentRequestMenu.css";

function AppointmentRequestMenu() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div className="requests-menu" onClick={() => setIsMenuActive((prev) => !prev)}>
      MENU
      <div className={isMenuActive ? "requests-menu-list_active" : "requests-menu-list_inactive"}>
        {requestTypes.map((request, index) => (
          <Link to={request.path} key={request.name + index} state={request.path}>
            <button className="menu-link" value={request.name}>
              {request.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AppointmentRequestMenu;
