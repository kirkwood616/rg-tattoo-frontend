import { rejectSubmitRequest } from "admin/utils/RejectSubmitRequest";
import requestApiCall from "admin/utils/RequestApiCall";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest, RejectType } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: AppointmentRequest;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  submitButtonText: string;
  rejectType: RejectType;
  denyRequest?: boolean;
  cancelRequest?: boolean;
}

function RejectModal({ request, isActive, setIsActive, submitButtonText, rejectType, denyRequest, cancelRequest }: Props) {
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [deniedReason, setDeniedReason] = useState("");
  const [canceledReason, setCanceledReason] = useState("");

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onRejectRequest(): void {
    if (rejectType === "denied") {
      if (!deniedReason.length) return;
      else setIsSubmitActive((current) => !current);
    }
    if (rejectType === "canceled") {
      if (!canceledReason.length) return;
      else setIsSubmitActive((current) => !current);
    }
  }

  async function handleRejectRequest(): Promise<void> {
    toggleLoading();
    try {
      const updatedRequest: AppointmentRequest = rejectSubmitRequest(request, rejectType, deniedReason, canceledReason);
      await requestApiCall(updatedRequest);
      setIsActive((current) => !current);
      navigate(`/admin/appointment-requests/${updatedRequest.requestStatus}/${updatedRequest._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <ModalWindow isActive={isActive} setIsActive={setIsActive}>
      {denyRequest && (
        <>
          <h1>DENY REQUEST</h1>
          <label htmlFor="deny-reason">Please provide a reason for denying this request:</label>
          <textarea
            id="deny-reason"
            name="deny-reason"
            className="deny-textarea"
            value={deniedReason}
            onChange={(e) => setDeniedReason(e.target.value)}
          />

          {!deniedReason.length && <p>*Reason Required*</p>}

          <p>* This message will appear in the client's denied notification email. *</p>
        </>
      )}

      {cancelRequest && (
        <>
          <h1>CANCEL APPOINTMENT</h1>
          <label htmlFor="cancel-reason">Please enter a reason the appointment was cancelled:</label>
          <textarea
            id="cancel-reason"
            name="cancel-reason"
            value={canceledReason}
            onChange={(e) => setCanceledReason(e.target.value)}
          />

          {!canceledReason.length && <p>** Reason Required **</p>}

          <p>* This message will appear in the client's canceled notification email *</p>
        </>
      )}

      <GoButton
        type="button"
        text={submitButtonText}
        backgroundColor={
          (denyRequest && !deniedReason.length) || (cancelRequest && !canceledReason.length) ? "var(--dark-gray-2)" : "green"
        }
        onClick={onRejectRequest}
      />
      <GoButton type="button" text="CLOSE WINDOW" backgroundColor="red" onClick={() => setIsActive((current) => !current)} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleRejectRequest}
          yesButtonText={"YES"}
        />
      )}
    </ModalWindow>
  );
}

export default RejectModal;
