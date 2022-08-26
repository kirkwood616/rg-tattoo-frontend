// import "./DepositReceivedModal.css";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { depositBaseValue } from "../../../admin/AdminSettings";
import AppContext from "../../../context/AppContext";
import { AppointmentRequest } from "../../../models/AppointmentRequest";
import { sendDepositReceivedRequest } from "../../../services/AdminApiService";
import GoButton from "../../buttons/GoButton";
import ModalWindow from "../../modals/ModalWindow";

interface Props {
  request: AppointmentRequest;
  isReceivedActive: boolean;
  setIsReceivedActive: Dispatch<SetStateAction<boolean>>;
}

function DepositReceivedModal({ request, isReceivedActive, setIsReceivedActive }: Props) {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);

  // STATE
  const [depositAmmount, setDepositAmmount] = useState(depositBaseValue);

  // NAVIGATE
  const navigate = useNavigate();

  // DEPOSIT RECEIVED
  function onReceived(): void {
    const requestWithDeposit: AppointmentRequest = {
      ...request,
      requestStatus: "deposit-received",
      depositAmmountReceived: depositAmmount,
      historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Deposit Received. Appointment Scheduled." }],
    };
    setIsLoading(true);
    sendDepositReceivedRequest(requestWithDeposit)
      .catch((error) => console.error(error))
      .then(() => {
        setIsLoading(false);
        setIsReceivedActive(false);
        navigate("/admin/appointment-requests");
      });
  }

  return (
    <ModalWindow isActive={isReceivedActive} setIsActive={setIsReceivedActive} className={"deposit-confirm"}>
      <label htmlFor="ammount">Ammount Received: </label>
      <input type="number" id="ammount" min={0} value={depositAmmount} onChange={(e) => setDepositAmmount(Number(e.target.value))} />
      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onReceived} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsReceivedActive(false)} />
    </ModalWindow>
  );
}

export default DepositReceivedModal;
