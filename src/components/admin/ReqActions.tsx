import { AppointmentRequest } from "../../models/AppointmentRequest";
import ClosedRequestActions from "./ClosedRequestActions";
import OpenRequestActions from "./OpenRequestActions";
import "./ReqActions.css";

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
