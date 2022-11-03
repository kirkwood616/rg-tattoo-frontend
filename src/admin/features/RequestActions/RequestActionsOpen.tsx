import ActionModal from "admin/modals/ActionModal";
import RejectModal from "admin/modals/RejectModal";
import GoButton from "components/buttons/GoButton";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useState } from "react";

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
            <ActionModal
              request={request}
              isActive={isApproveActive}
              setIsActive={setIsApproveActive}
              modalClassName="approving-request"
              submitButtonText="APPROVE"
            />
          )}
          {isDenyActive && (
            <RejectModal
              isActive={isDenyActive}
              setIsActive={setIsDenyActive}
              request={request}
              submitButtonText="SUBMIT"
              rejectType="denied"
              denyRequest
            />
          )}
        </>
      )}

      {request.requestStatus === "awaiting-deposit" && (
        <>
          <GoButton
            type="button"
            text="DEPOSIT RECEIVED"
            backgroundColor="green"
            onClick={() => setIsReceivedActive(true)}
          />
          <GoButton type="button" text="DENY" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
          {isReceivedActive && (
            <ActionModal
              request={request}
              isActive={isReceivedActive}
              setIsActive={setIsReceivedActive}
              modalClassName={"deposit-received"}
              submitButtonText={"SUBMIT"}
            />
          )}
          {isDenyActive && (
            <RejectModal
              isActive={isDenyActive}
              setIsActive={setIsDenyActive}
              request={request}
              submitButtonText="SUBMIT"
              rejectType="denied"
              denyRequest
            />
          )}
        </>
      )}

      {request.requestStatus === "deposit-received" && (
        <>
          <GoButton
            type="button"
            text="APPOINTMENT COMPLETED"
            backgroundColor="green"
            onClick={() => setIsCompletedActive(true)}
          />
          <GoButton type="button" text="CANCEL APPOINTMENT" backgroundColor="red" onClick={() => setIsCancelActive(true)} />
          {isCompletedActive && (
            <ActionModal
              request={request}
              isActive={isCompletedActive}
              setIsActive={setIsCompletedActive}
              modalClassName={"completed-request"}
              submitButtonText={"SUBMIT"}
            />
          )}
          {isCancelActive && (
            <RejectModal
              request={request}
              isActive={isCancelActive}
              setIsActive={setIsCancelActive}
              submitButtonText="SUBMIT"
              rejectType="canceled"
              cancelRequest
            />
          )}
        </>
      )}
    </div>
  );
}

export default OpenRequestActions;
