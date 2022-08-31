import { AppointmentRequest } from "models/AppointmentRequest";
import "./RequestActions.css";
import ClosedRequestActions from "./RequestActionsClosed";
import OpenRequestActions from "./RequestActionsOpen";

interface Props {
  request: AppointmentRequest;
}

function ReqActions({ request }: Props) {
  switch (request.requestStatus) {
    case "new":
    case "awaiting-deposit":
    case "deposit-received":
      return <OpenRequestActions request={request} />;
    default:
      return <ClosedRequestActions request={request} />;
  }
}

export default ReqActions;
