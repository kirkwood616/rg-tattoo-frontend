import { format } from "date-fns";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { getRequests } from "../../services/AdminApiService";
import { formatDate, formatTime } from "../../utils/Formatting";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import AdminPage from "./AdminPage";
import useLocationRoute from "./hooks/useLocationRoute";

function RequestListByStatus() {
  const { route, title } = useLocationRoute();

  const { data: requests, error: requestsError } = useSWR(`appointment-requests/${route}`, getRequests, {
    revalidateOnFocus: false,
  });

  if (requestsError) return <h1>Something went wrong!</h1>;
  if (!requests) return <LoadingDotsIcon />;
  return (
    <AdminPage title={`${title} Requests`}>
      <div className="request-list_container">
        <h2>{requests.length > 0 ? `${title} Requests` : `No ${title} Requests`}</h2>
        {requests.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={request._id!}>
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
      </div>
    </AdminPage>
  );
}

export default RequestListByStatus;
