import { Outlet } from "react-router-dom";
import AppointmentRequestMenu from "../../admin/components/menu/AppointmentRequestMenu";
import "./AppointmentRequests.css";

function AppointmentRequests() {
  return (
    <div className="AppointmentRequests">
      <AppointmentRequestMenu />
      <Outlet />
    </div>
  );
}

export default AppointmentRequests;
