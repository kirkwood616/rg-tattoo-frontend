import { depositBaseValue } from "admin/settings/AdminSettings";
import actionSubmitRequest from "admin/utils/ActionSubmitRequest";
import requestApiCall from "admin/utils/RequestApiCall";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: AppointmentRequest;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  modalClassName: string;
  submitButtonText: string;
}

function ActionModal({ request, isActive, setIsActive, modalClassName, submitButtonText }: Props) {
  const [depositRequired, setDepositRequired] = useState<number>(request.depositRequired);
  const [depositAmmount, setDepositAmmount] = useState<number>(depositBaseValue);
  const [priceCharged, setPriceCharged] = useState<number>(0);
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onSubmit(): void {
    setIsSubmitActive((current) => !current);
  }

  async function handleSubmit(): Promise<void> {
    toggleLoading();
    try {
      const updatedRequest: AppointmentRequest = actionSubmitRequest(request, depositRequired, depositAmmount, priceCharged);
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
    <ModalWindow isActive={isActive} setIsActive={setIsActive} className={modalClassName}>
      {request.requestStatus === "new" && (
        <div className="approve-request">
          <h1>APPROVE REQUEST</h1>
          <label htmlFor="deposit-required">Deposit Ammount Required:</label>
          <input
            type="number"
            name="deposit-required"
            id="deposit-required"
            min={50}
            step={25}
            value={depositRequired}
            onChange={(e) => setDepositRequired(Number(e.target.value))}
          />
        </div>
      )}

      {request.requestStatus === "awaiting-deposit" && (
        <>
          <h1>DEPOSIT RECEIVED</h1>
          <label htmlFor="ammount">Ammount Received: </label>
          <input
            type="number"
            id="ammount"
            min={0}
            value={depositAmmount}
            onChange={(e) => setDepositAmmount(Number(e.target.value))}
          />
        </>
      )}

      {request.requestStatus === "deposit-received" && (
        <>
          <h1>APPOINTMENT COMPLETED</h1>
          <label htmlFor="price-charged">Price Charged: </label>
          <input
            type="number"
            name="price-charged"
            id="price-charged"
            min={0}
            value={priceCharged}
            onChange={(e) => setPriceCharged(Number(e.target.value))}
          />
        </>
      )}

      <GoButton type="button" text={submitButtonText} backgroundColor="green" onClick={onSubmit} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsActive((current) => !current)} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleSubmit}
          yesButtonText="SUBMIT"
        />
      )}
    </ModalWindow>
  );
}

export default ActionModal;
