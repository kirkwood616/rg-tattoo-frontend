import { format } from "date-fns";
import { useContext } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
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
  const locationListRoute = location.state;
  const params = useParams();

  // ROUTE LOCATION LOGIC
  switch (locationListRoute) {
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
      {params.id && <Outlet />}
      {!params.id && (
        <>
          <h2>{title} Requests</h2>
          {requestType!.length > 0 &&
            requestType!.map((request, index) => (
              <div className="request_container" key={request && index}>
                <Link to={request._id!} state={locationListRoute}>
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
        </>
      )}
    </AdminPage>
  );
}

export default RequestList;
