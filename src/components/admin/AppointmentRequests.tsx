import { useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { formatDate, formatTime } from "../../functions/Formatting";
import AppContext from "../../context/AppContext";
import AdminPage from "./AdminPage";
import "./AppointmentRequests.css";

function AppointmentRequests() {
  // CONTEXT
  let { appointmentRequests } = useContext(AppContext);

  return (
    <AdminPage title="Appointment Requests">
      <div className="AppointmentRequests">
        <h1>Appointment Requests</h1>
        {appointmentRequests.length ? (
          appointmentRequests.map((request, index) => (
            <div className="request_container" key={index}>
              <Link to={`/admin/appointment-requests/${request._id}`}>
                <div className="request-info_container">
                  <div className="request-date-time_container">
                    {formatDate(request.requestDate)} @ {formatTime(request.requestTime)}
                  </div>
                  <div className="request-submitted_container">
                    <div className="request-info_container">
                      {request.firstName} {request.lastName}
                    </div>
                    <div className="request-info_container">{request.email}</div>
                    <div className="request-info_container">Submitted: {format(new Date(request.requestSubmittedDate), "M/dd/yyyy @ h:mm a")}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h2>No Requests</h2>
        )}
      </div>
    </AdminPage>
  );
}

export default AppointmentRequests;
