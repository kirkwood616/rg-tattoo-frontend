import { AppointmentRequest } from "models/AppointmentRequest";
import "./RequestActions.css";
import OpenRequestActions from "./RequestActionsOpen";

interface Props {
  request: AppointmentRequest;
}

function RequestActions({ request }: Props) {
  switch (request.requestStatus) {
    case "new":
    case "awaiting-deposit":
    case "deposit-received":
      return <OpenRequestActions request={request} />;
    default:
      return <></>;
  }
}

export default RequestActions;
