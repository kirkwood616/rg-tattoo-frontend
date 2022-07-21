import { format } from "date-fns";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import { formatDate, formatTime } from "../../utils/Formatting";
import AdminPage from "./AdminPage";

function RequestList() {
  // CONTEXT
  const { newAppointmentRequests, rejectedRequests } = useContext(AdminContext);

  // REQUEST TYPE VARIABLES
  let requestType: AppointmentRequest[] | undefined = undefined;
  let title: string = "";

  // LOCATION
  const location = useLocation();
  const locationRoute = location.pathname.slice(28);

  // ROUTE LOCATION LOGIC
  switch (locationRoute) {
    case "new":
      requestType = newAppointmentRequests;
      title = "New";
      break;
    case "rejected":
      requestType = rejectedRequests;
      title = "Rejected";
      break;
    default:
      requestType = newAppointmentRequests;
      title = "New";
      break;
  }

  return (
    <AdminPage title={`${title} Requests`}>
      <h2>{title} Requests</h2>
      {requestType!.length > 0 &&
        requestType!.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={`/admin/appointment-requests/${locationRoute}/${request._id}`}>
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
      {requestType!.length === 0 && <h2>No {title} Requests</h2>}
    </AdminPage>
  );
}

export default RequestList;
