import { useState } from "react";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import DenyModal from "./modals/DenyModal";
import DepositReceivedModal from "./modals/DepositReceivedModal";

interface Props {
  request: AppointmentRequest;
}

function ReqActionsAwaitingDeposit({ request }: Props) {
  const [isReceivedActive, setIsReceivedActive] = useState(false);
  const [isDenyActive, setIsDenyActive] = useState(false);

  return (
    <>
      <GoButton type="button" text="DEPOSIT RECEIVED" backgroundColor="green" onClick={() => setIsReceivedActive(true)} />
      <GoButton type="button" text="DENY" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
      {isReceivedActive && <DepositReceivedModal request={request} isReceivedActive={isReceivedActive} setIsReceivedActive={setIsReceivedActive} />}
      {isDenyActive && <DenyModal isDenyActive={isDenyActive} setIsDenyActive={setIsDenyActive} request={request} />}
    </>
  );
}

export default ReqActionsAwaitingDeposit;
