import { format } from "date-fns";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../utils/Formatting";
import AppContext from "../../context/AppContext";

function RejectedRequests() {
  // CONTEXT
  let { rejectedRequests } = useContext(AppContext);
  console.log(rejectedRequests);

  return (
    <>
      <h2>Rejected Requests</h2>
      {rejectedRequests.length > 0 &&
        rejectedRequests.map((request, index) => (
          <div className="request_container" key={request && index}>
            <Link to={`/admin/rejected-requests/${request._id}`}>
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
      {rejectedRequests.length === 0 && <h2>No New Requests</h2>}
    </>
  );
}

export default RejectedRequests;
