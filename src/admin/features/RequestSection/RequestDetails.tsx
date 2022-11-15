import { adminLocaleTZ } from "admin/settings/AdminSettings";
import { AppointmentRequest } from "models/AppointmentRequest";
import { formatISODateTime, formatRouteTitle, formatTimeWithZone, formatUsDate } from "utils/Formatting";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
}

function RequestDetails({ request }: Props) {
  return (
    <RequestSection title="REQUEST DETAILS">
      <div className="items_container">
        <div className="request-item_title">REQUEST STATUS</div>
        <div className="request-item_info">{formatRouteTitle(request.requestStatus)}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">REQUESTED DATE</div>
        <div className="request-item_info">{formatUsDate(request.requestDate)}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">REQUESTED TIME</div>
        <div className="request-item_info">{formatTimeWithZone(request.requestTime, adminLocaleTZ)}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">DATE SUBMITTED</div>
        <div className="request-item_info">{formatISODateTime(request.requestSubmittedDate, adminLocaleTZ)}</div>
      </div>

      {request.requestStatus !== "new" && (
        <div className="items_container">
          <div className="request-item_title">DEPOSIT REQUIRED</div>
          <div className="request-item_info">${request.depositRequired}</div>
        </div>
      )}

      {request.depositAmmountReceived > 0 && (
        <div className="items_container">
          <div className="request-item_title">DEPOSIT RECEIVED</div>
          <div className="request-item_info">${request.depositAmmountReceived}</div>
        </div>
      )}

      {request.priceCharged > 0 && (
        <div className="items_container">
          <div className="request-item_title">PRICE CHARGED</div>
          <div className="request-item_info">${request.priceCharged}</div>
        </div>
      )}
    </RequestSection>
  );
}

export default RequestDetails;
