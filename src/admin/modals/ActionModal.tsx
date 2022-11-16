import ActionContext from "admin/context/ActionContext";
import * as ActionField from "admin/features/RequestActions/ActionFields";
import actionSubmitRequest from "admin/utils/ActionSubmitRequest";
import requestApiCall from "admin/utils/RequestApiCall";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import Error404 from "pages/Error404";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function ActionModal() {
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);

  const { actionState, dispatch } = useContext(ActionContext);
  const { toggleLoading, isModalOpen, toggleModalOpen } = useContext(AppContext);
  const navigate = useNavigate();

  function onClose(): void {
    toggleModalOpen();
    dispatch({ type: "resetWithState" });
  }

  function onSubmit(): void {
    if (isModalOpen) {
      setIsSubmitActive((current) => !current);
    } else {
      toggleModalOpen(setIsSubmitActive);
    }
  }

  async function handleSubmit(): Promise<void> {
    toggleLoading();
    try {
      if (!actionState.request) throw new Error("No Request");
      const updatedRequest: AppointmentRequest = actionSubmitRequest(actionState);
      await requestApiCall(updatedRequest);
      dispatch({ type: "reset" });
      toggleModalOpen();
      navigate(`/admin/appointment-requests/${updatedRequest.requestStatus}/${updatedRequest._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  if (!actionState.request) return <Error404 />;
  return (
    <ModalWindow isActive={actionState.isActionActive} setIsActive={onClose} isDispatch>
      {actionState.request.requestStatus === "new" && (
        <ActionField.SubmitPrice
          title="APPROVE REQUEST"
          label="Deposit Ammount Required"
          statePrice={actionState.depositRequired}
          dispatchType="depositRequired"
        />
      )}

      {actionState.request.requestStatus === "awaiting-deposit" && (
        <ActionField.SubmitPrice
          title="DEPOSIT-RECEIVED"
          label="Deposit Ammount Received"
          statePrice={actionState.depositReceived}
          dispatchType="depositReceived"
        />
      )}

      {actionState.request.requestStatus === "deposit-received" && (
        <ActionField.SubmitPrice
          title="APPOINTMENT COMPLETED"
          label="Price Charged"
          statePrice={actionState.priceCharged}
          dispatchType="priceCharged"
        />
      )}

      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onSubmit} isDisabled={actionState.hasErrors} />

      <GoButton type="button" text="CLOSE WINDOW" backgroundColor="red" onClick={onClose} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleSubmit}
          yesButtonText="YES"
          subModal
        />
      )}
    </ModalWindow>
  );
}

export default ActionModal;
