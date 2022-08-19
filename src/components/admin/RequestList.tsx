import { format } from "date-fns";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import { getRequests } from "../../services/AdminApiService";
import { formatDate, formatTime } from "../../utils/Formatting";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import AdminPage from "./AdminPage";

function RequestList() {
  // CONTEXT
  // const { newAppointmentRequests, deniedRequests } = useContext(AdminContext);

  // REQUEST TYPE VARIABLES
  // let requestType: AppointmentRequest[] | undefined = undefined;

  // LOCATION
  const location = useLocation();
  const locationListRoute = location.state as string;
  const params = useParams();

  // SWR
  const { data: requests, error: requestsError } = useSWR(`/appointment-requests/${locationListRoute}`, getRequests, {
    revalidateOnFocus: false,
  });

  let title: string = locationListRoute[0].toUpperCase() + locationListRoute.substring(1);

  if (requestsError) return <h1>Something went wrong!</h1>;
  if (!requests) return <LoadingDotsIcon />;
  return (
    <AdminPage title={`${title} Requests`}>
      {params.id && <Outlet />}
      {!params.id && (
        <>
          <h2>{title} Requests</h2>
          {requests!.length > 0 &&
            requests!.map((request, index) => (
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
          {requests!.length === 0 && <h2>No {title} Requests</h2>}
        </>
      )}
    </AdminPage>
  );
}

export default RequestList;
