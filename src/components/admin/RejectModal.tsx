import { Dispatch, SetStateAction, useState } from "react";
import AppointmentRequest from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import "./RejectModal.css";

interface Props {
  isRejectActive: boolean;
  setIsRejectActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function RejectModal({ isRejectActive, setIsRejectActive, request }: Props) {
  // STATE
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // REJECT
  function onReject(): void {
    let rejectedRequest: AppointmentRequest = {
      ...request,
      isRequestDenied: true,
      deniedMessage: rejectionReason,
    };
    console.log(rejectedRequest);
    setRejectionReason("");
    setIsRejectActive(false);
  }

  // CANCEL
  function onCancel(): void {
    setRejectionReason("");
    setIsRejectActive(false);
  }

  return (
    <div className={isRejectActive ? "RejectModal" : "RejectModal hide"}>
      <div className="reject-info">
        Please provide a reason for rejecting this request. <br /> <br />
        <textarea id="rejectReason" name="rejectReason" className="reject-textarea" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
        <GoButton type="button" text="REJECT" backgroundColor="green" onClick={onReject} />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={onCancel} />
      </div>
    </div>
  );
}

export default RejectModal;
