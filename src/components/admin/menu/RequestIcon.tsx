import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import "./RequestIcon.css";

function RequestIcon() {
  // CONTEXT
  let { appointmentRequests } = useContext(AppContext);

  return (
    <div className="RequestIcon">
      <div className="request-number_container">
        <span className="request-number">{appointmentRequests.length}</span>
      </div>
    </div>
  );
}

export default RequestIcon;
