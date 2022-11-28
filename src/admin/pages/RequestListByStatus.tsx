import AdminPage from "admin/components/AdminPage";
import useLocationRoute from "admin/hooks/useLocationRoute";
import { getRequests } from "admin/services/AdminApiService";
import { adminLocaleTZ } from "admin/settings/AdminSettings";
import FetchError from "components/errors/FetchError";
import InfoSection from "components/InfoSection/InfoSection";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { formatISODateTime, formatTimeWithZone, formatUsDate } from "utils/Formatting";

function RequestListByStatus() {
  const { route, title } = useLocationRoute();

  const { data: requests, error: requestsError } = useSWR(`appointment-requests/${route}`, getRequests, {
    revalidateOnFocus: false,
  });

  if (requestsError) return <FetchError fetchError={requestsError} />;
  if (!requests) return <LoadingDotsIcon />;
  return (
    <AdminPage title={`${title} Requests`}>
      <div className="requests-list_container">
        <h2>{requests.length ? `${title} Requests` : `No ${title} Requests`}</h2>

        {requests.map((request, index) => (
          <Link to={request._id!} key={index + request._id!}>
            <InfoSection
              title={`${formatUsDate(request.requestDate)} @ ${formatTimeWithZone(request.requestTime, adminLocaleTZ)}`}
              body={
                <>
                  <p>
                    {request.firstName} {request.lastName}
                  </p>
                  <p>{request.email}</p>
                  <p>Submitted: {formatISODateTime(request.requestSubmittedDate, adminLocaleTZ)}</p>
                </>
              }
            />
          </Link>
        ))}
      </div>
    </AdminPage>
  );
}

export default RequestListByStatus;
