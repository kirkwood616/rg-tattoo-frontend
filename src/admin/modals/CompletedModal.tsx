import GoButton from "components/buttons/GoButton";
import ModalWindow from "components/modals/ModalWindow";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  request: AppointmentRequest;
  isCompletedActive: boolean;
  setIsCompletedActive: Dispatch<SetStateAction<boolean>>;
}

function CompletedModal({ request, isCompletedActive, setIsCompletedActive }: Props) {
  const [ammountReceived, setAmmountReceived] = useState(0);

  function onCompleted(): void {
    const requestCompleted: AppointmentRequest = {
      ...request,
      requestStatus: "completed",
      priceCharged: ammountReceived,
      historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Completed." }],
    };
    // ADD API REQUEST
  }

  return (
    <ModalWindow isActive={isCompletedActive} setIsActive={setIsCompletedActive} className={"completed-confirm"}>
      <label htmlFor="ammount-received">Ammount Received: </label>
      <input type="number" name="ammount-receive" id="ammount-receive" min={0} value={ammountReceived} onChange={(e) => setAmmountReceived(Number(e.target.value))} />
      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onCompleted} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsCompletedActive(false)} />
    </ModalWindow>
  );
}

export default CompletedModal;
