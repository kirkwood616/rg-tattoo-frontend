import { Link, Outlet } from "react-router-dom";
import "./AppointmentRequests.css";

function AppointmentRequests() {
  return (
    <div className="AppointmentRequests">
      <Link to="new">NEW REQUESTS</Link>
      <Link to="rejected">REJECTED REQUESTS</Link>
      <Outlet />
    </div>
  );
}

export default AppointmentRequests;
