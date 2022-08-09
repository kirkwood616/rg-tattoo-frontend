import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { requestTypes } from "../../admin/AdminSettings";
import "./AppointmentRequests.css";

function AppointmentRequests() {
  const [menuItem, setMenuItem] = useState("MENU");
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div className="AppointmentRequests">
      <div className="requests-menu" onClick={() => setIsMenuActive((prev) => !prev)}>
        MENU
        <div className={isMenuActive ? "requests-menu-list_active" : "requests-menu-list_inactive"}>
          {requestTypes.map((request, index) => (
            <Link to={request.path} key={request.name + index} state={request.path}>
              <button className="menu-link" value={request.name} onClick={(e) => setMenuItem(e.currentTarget.value)}>
                {request.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AppointmentRequests;
