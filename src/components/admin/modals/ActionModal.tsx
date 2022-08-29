import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { depositBaseValue } from "../../../admin/AdminSettings";
import AppContext from "../../../context/AppContext";
import { AppointmentRequest } from "../../../models/AppointmentRequest";
import actionSubmitRequest from "../../../utils/ActionSubmitRequest";
import requestApiCall from "../../../utils/RequestApiCall";
import GoButton from "../../buttons/GoButton";
import ModalWindow from "../../modals/ModalWindow";
import AddNote from "../AddNote";

interface Props {
  request: AppointmentRequest;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  modalClassName: string;
  submitButtonText: string;
}

function ActionModal({ request, isActive, setIsActive, modalClassName, submitButtonText }: Props) {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);

  // NAVIGATE
  const navigate = useNavigate();

  // STATE
  const [note, setNote] = useState("");
  const [depositAmmount, setDepositAmmount] = useState(depositBaseValue);
  const [priceCharged, setPriceCharged] = useState(0);

  // SUBMIT
  function onSubmit(): void {
    setIsLoading(true);
    requestApiCall(actionSubmitRequest(request, note, depositAmmount, priceCharged))
      ?.catch((error) => console.error(error))
      .then(() => {
        setIsLoading(false);
        setIsActive(false);
        navigate("/admin/appointment-requests");
      });
  }

  return (
    <ModalWindow isActive={isActive} setIsActive={setIsActive} className={modalClassName}>
      {request.requestStatus === "new" && <h1>Are You Sure?</h1>}

      {request.requestStatus === "awaiting-deposit" && (
        <>
          <label htmlFor="ammount">Ammount Received: </label>
          <input type="number" id="ammount" min={0} value={depositAmmount} onChange={(e) => setDepositAmmount(Number(e.target.value))} />
        </>
      )}

      {request.requestStatus === "deposit-received" && (
        <>
          <label htmlFor="price-charged">Price Charged: </label>
          <input type="number" name="price-charged" id="price-charged" min={0} value={priceCharged} onChange={(e) => setPriceCharged(Number(e.target.value))} />
        </>
      )}

      <AddNote request={request} note={note} setNote={setNote} />
      <GoButton type="button" text={submitButtonText} backgroundColor="green" onClick={onSubmit} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsActive(false)} />
    </ModalWindow>
  );
}

export default ActionModal;
