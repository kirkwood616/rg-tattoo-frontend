import { AppointmentRequest } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
}

function CustomerDetails({ request }: Props) {
  return (
    <RequestSection title="CUSTOMER DETAILS">
      <div className="items_container">
        <div className="request-item_title">NAME</div>
        <div className="request-item_info">{`${request.firstName} ${request.lastName}`}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">AGE</div>
        <div className="request-item_info">{request.age}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">EMAIL</div>
        <div className="request-item_info">
          <a href={`mailto: ${request.email}`}>{request.email}</a>
        </div>
      </div>
      <div className="items_container">
        <div className="request-item_title">PHONE</div>
        <div className="request-item_info">{request.phoneNumber}</div>
      </div>
    </RequestSection>
  );
}

export default CustomerDetails;
