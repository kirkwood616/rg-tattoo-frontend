import AdminPage from "admin/components/AdminPage";
import { getRequestStatusCounts } from "admin/services/AdminApiService";
import FetchError from "components/errors/FetchError";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import { RequestStatus } from "models/AppointmentRequest";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { formatRouteTitle } from "utils/Formatting";
import "./AppointmentRequestsMain.css";

interface StatusCount {
  _id: RequestStatus;
  count: number;
}

function AppointmentRequestsMain() {
  const { data: counts, error: countsError } = useSWR<StatusCount[], Error>(
    "appointment-requests/status-count",
    getRequestStatusCounts,
    {
      revalidateOnFocus: false,
    }
  );

  if (countsError) return <FetchError fetchError={countsError} />;
  if (!counts) return <LoadingDotsIcon />;
  return (
    <AdminPage title={"Appointment Requests"}>
      <div className="AppointmentRequestsMain">
        <h1>Main</h1>
        {counts.map((item, index) => (
          <Link to={item._id} key={item._id + index}>
            <div className="count_container">
              <div className="count_number">{item.count}</div>
              <div className="count_status">{formatRouteTitle(item._id)}</div>
            </div>
          </Link>
        ))}
      </div>
    </AdminPage>
  );
}

export default AppointmentRequestsMain;
