import { AppointmentRequest } from "../../models/AppointmentRequest";
import ReqActionsAwaitingDeposit from "./ReqActionsAwaitingDeposit";
import ReqActionsNew from "./ReqActionsNew";

interface Props {
  request: AppointmentRequest;
}

function ReqActions({ request }: Props) {
  return (
    <>
      {request.requestStatus === "new" && <ReqActionsNew request={request} />}
      {request.requestStatus === "awaiting-deposit" && <ReqActionsAwaitingDeposit request={request} />}
    </>
  );
}

export default ReqActions;
