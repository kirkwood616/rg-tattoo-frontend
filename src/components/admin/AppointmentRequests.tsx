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
        {menuItem}
        <div className={isMenuActive ? "requests-menu-list_active" : "requests-menu-list_inactive"}>
          {requestTypes.map((item, index) => (
            <Link to={item.path} key={item.name + index}>
              <button className="menu-link" value={item.name} onClick={(e) => setMenuItem(e.currentTarget.value)}>
                {item.name}
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
