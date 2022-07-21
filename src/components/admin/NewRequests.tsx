import { format } from "date-fns";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import { formatDate, formatTime } from "../../utils/Formatting";

function NewRequests() {
  // CONTEXT
  const { newAppointmentRequests } = useContext(AdminContext);

  return (
    <>
      <h2>New Requests</h2>
      {newAppointmentRequests.length > 0 &&
        newAppointmentRequests.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={`/admin/appointment-requests/new/${request._id}`}>
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
        ))}
      {newAppointmentRequests.length === 0 && <h2>No New Requests</h2>}
    </>
  );
}

export default NewRequests;
