import AdminPage from "admin/components/AdminPage";
import useLocationRoute from "admin/hooks/useLocationRoute";
import { getRequests } from "admin/services/AdminApiService";
import { adminLocaleTZ } from "admin/settings/AdminSettings";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { formatISODateTime, formatTimeWithZone, formatUsDate } from "utils/Formatting";

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
        <h2>{requests.length ? `${title} Requests` : `No ${title} Requests`}</h2>
        {requests.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={request._id!}>
              <div className="request-info_container">
                <div className="request-date-time_container">
                  {`${formatUsDate(request.requestDate)} @ ${formatTimeWithZone(request.requestTime, adminLocaleTZ)}`}
                </div>
                <div className="request-submitted_container">
                  <div className="request-info_container">
                    {request.firstName} {request.lastName}
                  </div>
                  <div className="request-info_container">{request.email}</div>
                  <div className="request-info_container">
                    Submitted: {formatISODateTime(request.requestSubmittedDate, adminLocaleTZ)}
                  </div>
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
