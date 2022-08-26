// import "./ReqActionsDepositReceived.css";

import { useState } from "react";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import CompletedModal from "./modals/CompletedModal";

interface Props {
  request: AppointmentRequest;
}

function ReqActionsDepositReceived({ request }: Props) {
  const [isCompletedActive, setIsCompletedActive] = useState(false);
  const [isCancelActive, setIsCancelActive] = useState(false);

  return (
    <>
      <GoButton type="button" text="APPOINTMENT COMPLETED" backgroundColor="green" onClick={() => setIsCompletedActive(true)} />
      <GoButton type="button" text="CANCEL APPOINTMENT" backgroundColor="red" onClick={() => setIsCancelActive(true)} />
      {isCompletedActive && <CompletedModal request={request} isCompletedActive={isCompletedActive} setIsCompletedActive={setIsCompletedActive} />}
    </>
  );
}

export default ReqActionsDepositReceived;
