import { sendCompletedRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: AppointmentRequest;
  isCompletedActive: boolean;
  setIsCompletedActive: Dispatch<SetStateAction<boolean>>;
}

function CompletedModal({ request, isCompletedActive, setIsCompletedActive }: Props) {
  const [ammountReceived, setAmmountReceived] = useState(0);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onCompletedRequest(): void {
    if (!ammountReceived) return;
    setIsSubmitActive((current) => !current);
  }

  async function handleCompletedRequest(): Promise<void> {
    toggleLoading();
    try {
      const completedRequest: AppointmentRequest = {
        ...request,
        requestStatus: "completed",
        priceCharged: ammountReceived,
        historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Completed." }],
      };
      await sendCompletedRequest(completedRequest);
      setIsCompletedActive((current) => !current);
      navigate(`/admin/appointment-requests/completed/${completedRequest}`);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <ModalWindow isActive={isCompletedActive} setIsActive={setIsCompletedActive} className={"completed-confirm"}>
      <label htmlFor="ammount-received">Ammount Received: </label>
      <input
        type="number"
        name="ammount-receive"
        id="ammount-receive"
        min={0}
        value={ammountReceived}
        onChange={(e) => setAmmountReceived(Number(e.target.value))}
      />
      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onCompletedRequest} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsCompletedActive(false)} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleCompletedRequest}
          yesButtonText={"SUBMIT"}
        />
      )}
    </ModalWindow>
  );
}

export default CompletedModal;
