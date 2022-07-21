import { useContext } from "react";
import AdminContext from "../../../context/AdminContext";
import "./RequestIcon.css";

function RequestIcon() {
  // CONTEXT
  let { newAppointmentRequests } = useContext(AdminContext);

  return (
    <div className="RequestIcon">
      <div className="request-number_container">
        <span className="request-number">{newAppointmentRequests.length}</span>
      </div>
    </div>
  );
}

export default RequestIcon;
