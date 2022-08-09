import { format } from "date-fns";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import { formatDate, formatTime } from "../../utils/Formatting";

function DeniedRequests() {
  // CONTEXT
  const { deniedRequests } = useContext(AdminContext);

  return (
    <>
      <h2>Rejected Requests</h2>
      {deniedRequests.length > 0 &&
        deniedRequests.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={`/admin/appointment-requests/rejected/${request._id}`}>
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
      {deniedRequests.length === 0 && <h2>No New Requests</h2>}
    </>
  );
}

export default DeniedRequests;
