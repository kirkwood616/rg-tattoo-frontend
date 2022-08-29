import { useState } from "react";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import ActionModal from "./modals/ActionModal";
import CancelModal from "./modals/CancelModal";
import DenyModal from "./modals/DenyModal";

interface Props {
  request: AppointmentRequest;
}

function OpenRequestActions({ request }: Props) {
  const [isApproveActive, setIsApproveActive] = useState(false);
  const [isDenyActive, setIsDenyActive] = useState(false);
  const [isReceivedActive, setIsReceivedActive] = useState(false);
  const [isCompletedActive, setIsCompletedActive] = useState(false);
  const [isCancelActive, setIsCancelActive] = useState(false);

  return (
    <div className="ReqActions" style={{ display: "flex", flexDirection: "column" }}>
      {request.requestStatus === "new" && (
        <>
          <GoButton type="button" text="APPROVE" backgroundColor="green" onClick={() => setIsApproveActive(true)} />
          <GoButton type="button" text="DENY" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
          {isApproveActive && (
            <ActionModal request={request} isActive={isApproveActive} setIsActive={setIsApproveActive} modalClassName="approving-request" submitButtonText="APPROVE" />
          )}
          {isDenyActive && <DenyModal isDenyActive={isDenyActive} setIsDenyActive={setIsDenyActive} request={request} />}
        </>
      )}

      {request.requestStatus === "awaiting-deposit" && (
        <>
          <GoButton type="button" text="DEPOSIT RECEIVED" backgroundColor="green" onClick={() => setIsReceivedActive(true)} />
          <GoButton type="button" text="DENY" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
          {isReceivedActive && (
            <ActionModal request={request} isActive={isReceivedActive} setIsActive={setIsReceivedActive} modalClassName={"deposit-received"} submitButtonText={"SUBMIT"} />
          )}
          {isDenyActive && <DenyModal isDenyActive={isDenyActive} setIsDenyActive={setIsDenyActive} request={request} />}
        </>
      )}

      {request.requestStatus === "deposit-received" && (
        <>
          <GoButton type="button" text="APPOINTMENT COMPLETED" backgroundColor="green" onClick={() => setIsCompletedActive(true)} />
          <GoButton type="button" text="CANCEL APPOINTMENT" backgroundColor="red" onClick={() => setIsCancelActive(true)} />
          {isCompletedActive && (
            <ActionModal request={request} isActive={isCompletedActive} setIsActive={setIsCompletedActive} modalClassName={"completed-request"} submitButtonText={"SUBMIT"} />
          )}
          {isCancelActive && <CancelModal request={request} isCancelActive={isCancelActive} setIsCancelActive={setIsCancelActive} />}
        </>
      )}
    </div>
  );
}

export default OpenRequestActions;
