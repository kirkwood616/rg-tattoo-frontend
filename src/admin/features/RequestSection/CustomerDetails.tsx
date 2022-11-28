import InfoSection from "components/InfoSection/InfoSection";
import { AppointmentRequest } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
}

function CustomerDetails({ request }: Props) {
  return (
    <RequestSection title="CUSTOMER DETAILS">
      <InfoSection title={"NAME"} body={`${request.firstName} ${request.lastName}`} />

      <InfoSection title={"AGE"} body={request.age} />

      <InfoSection title={"EMAIL"} body={<a href={`mailto: ${request.email}`}>{request.email}</a>} />

      <InfoSection title={"PHONE"} body={request.phoneNumber} />
    </RequestSection>
  );
}

export default CustomerDetails;
