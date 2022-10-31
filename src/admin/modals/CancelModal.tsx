import { cancelRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: AppointmentRequest;
  isCancelActive: boolean;
  setIsCancelActive: Dispatch<SetStateAction<boolean>>;
}

function CancelModal({ request, isCancelActive, setIsCancelActive }: Props) {
  const [canceledReason, setCanceledReason] = useState("");
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onCancelRequest(): void {
    if (!canceledReason.length) return;
    setIsSubmitActive((current) => !current);
  }

  async function handleCancelRequest(): Promise<void> {
    toggleLoading();
    try {
      const canceledRequest: AppointmentRequest = {
        ...request,
        requestStatus: "canceled",
        historyLog: [
          ...request.historyLog,
          { dateCreated: new Date(), action: "Appointment Canceled.", note: canceledReason },
        ],
      };
      await cancelRequest(canceledRequest);
      setIsCancelActive((current) => !current);
      navigate(`/admin/appointment-requests/canceled/${canceledRequest._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <ModalWindow isActive={isCancelActive} setIsActive={setIsCancelActive} className="cancel-confirm">
      <label htmlFor="">Please enter a reason the appointment was cancelled</label>
      <textarea
        name="cancel-reason"
        id="cancel-reason"
        value={canceledReason}
        onChange={(e) => setCanceledReason(e.target.value)}
      />
      {!canceledReason.length && <p>*Reason Required*</p>}
      <p>* This message will be sent to the client in a notification email *</p>
      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onCancelRequest} />
      <GoButton
        type="button"
        text="CLOSE WINDOW"
        backgroundColor="red"
        onClick={() => setIsCancelActive((current) => !current)}
      />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleCancelRequest}
          yesButtonText={"SUBMIT"}
        />
      )}
    </ModalWindow>
  );
}

export default CancelModal;
