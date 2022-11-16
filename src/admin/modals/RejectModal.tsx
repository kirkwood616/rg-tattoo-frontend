import ActionContext from "admin/context/ActionContext";
import * as ActionField from "admin/features/RequestActions/ActionFields";
import { rejectSubmitRequest } from "admin/utils/RejectSubmitRequest";
import requestApiCall from "admin/utils/RequestApiCall";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import Error404 from "pages/Error404";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RejectModal() {
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { actionState, dispatch, dispatchIsRejectActive } = useContext(ActionContext);

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "hasErrors" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClose() {
    toggleModalOpen();
    dispatch({ type: "resetWithState" });
  }

  function onRejectRequest(): void {
    if (!actionState.request) return;

    if (actionState.request.requestStatus === ("new" || "awaiting-deposit")) {
      if (!actionState.deniedReason) return;
      setIsSubmitActive((current) => !current);
    }

    if (actionState.request.requestStatus === "deposit-received") {
      if (!actionState.canceledReason) return;
      setIsSubmitActive((current) => !current);
    }
  }

  async function handleRejectRequest(): Promise<void> {
    toggleLoading();
    try {
      if (!actionState.request) throw new Error("No Request");
      const updatedRequest: AppointmentRequest = rejectSubmitRequest(actionState);
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
    <ModalWindow isActive={actionState.isRejectActive} setIsActive={dispatchIsRejectActive} isDispatch>
      {(actionState.request.requestStatus === "new" || actionState.request.requestStatus === "awaiting-deposit") && (
        <ActionField.RejectText title="DENY REQUEST" stateText={actionState.deniedReason} dispatchType="deniedReason" />
      )}

      {actionState.request.requestStatus === "deposit-received" && (
        <ActionField.RejectText
          title="CANCEL APPOINTMENT"
          stateText={actionState.canceledReason}
          dispatchType="canceledReason"
        />
      )}

      <GoButton
        type="button"
        text="SUBMIT"
        backgroundColor="green"
        onClick={onRejectRequest}
        isDisabled={actionState.hasErrors}
      />
      <GoButton type="button" text="CLOSE WINDOW" backgroundColor="red" onClick={onClose} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleRejectRequest}
          yesButtonText={"YES"}
          subModal
        />
      )}
    </ModalWindow>
  );
}

export default RejectModal;
