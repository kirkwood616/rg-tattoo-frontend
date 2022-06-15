// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { format } from "date-fns";
// import { formatDate, formatTime } from "../../utils/Formatting";
// import AppContext from "../../context/AppContext";
import AdminPage from "./AdminPage";
import "./AppointmentRequests.css";
import NewRequests from "./NewRequests";
import RejectedRequests from "./RejectedRequests";

function AppointmentRequests() {
  return (
    <AdminPage title="Appointment Requests">
      <div className="AppointmentRequests">
        <NewRequests />
        <RejectedRequests />
      </div>
    </AdminPage>
  );
}

export default AppointmentRequests;
