import { Dispatch, SetStateAction, useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import AppointmentRequest from "../../../models/AppointmentRequest";
import { rejectAppointmentRequest } from "../../../services/AdminApiService";
import GoButton from "../../buttons/GoButton";
import ModalWindow from "../../modals/ModalWindow";
import "./RejectModal.css";

interface Props {
  isRejectActive: boolean;
  setIsRejectActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function RejectModal({ isRejectActive, setIsRejectActive, request }: Props) {
  // CONTEXT
  let { handleAppointmentRequests, setIsLoading } = useContext(AppContext);

  // NAVIGATE
  const navigate: NavigateFunction = useNavigate();

  // STATE
  const [rejectionReason, setRejectionReason] = useState<string>("");

  // REJECT
  function onReject(): void {
    const rejectedRequest: AppointmentRequest = {
      ...request,
      isRequestDenied: true,
      deniedMessage: rejectionReason,
    };
    if (!rejectedRequest._id) return;
    setIsLoading(true);
    rejectAppointmentRequest(rejectedRequest._id, rejectedRequest)
      .then(() => handleAppointmentRequests())
      .then(() => {
        setRejectionReason("");
        setIsLoading(false);
        setIsRejectActive(false);
      })
      .finally(() => navigate("/admin/appointment-requests"));
  }

  // CANCEL
  function onCancel(): void {
    setRejectionReason("");
    setIsRejectActive(false);
  }

  return (
    <ModalWindow isActive={isRejectActive} setIsActive={setIsRejectActive} className="reject-info">
      Please provide a reason for rejecting this request. <br /> <br />
      <textarea id="rejectReason" name="rejectReason" className="reject-textarea" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
      <GoButton type="button" text="REJECT" backgroundColor="green" onClick={onReject} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={onCancel} />
    </ModalWindow>
  );
}

export default RejectModal;
