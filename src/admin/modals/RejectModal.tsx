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
  const { actionState, dispatch, dispatchIsRejectActive } = useContext(ActionContext);
  const { toggleLoading } = useContext(AppContext);

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "hasErrors" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClose() {
    dispatch({ type: "resetWithState" });
  }

  function onRejectRequest(): void {
    if (!actionState.request) return;

    if (actionState.request.requestStatus === "new" || "awaiting-deposit") {
      if (!actionState.deniedReason) return;
      else setIsSubmitActive((current) => !current);
    }

    if (actionState.request.requestStatus === "deposit-received") {
      if (!actionState.canceledReason) return;
      else setIsSubmitActive((current) => !current);
    }
  }

  async function handleRejectRequest(): Promise<void> {
    toggleLoading();
    try {
      if (!actionState.request) throw new Error("No Request");
      const updatedRequest: AppointmentRequest = rejectSubmitRequest(actionState);
      await requestApiCall(updatedRequest);
      dispatch({ type: "reset" });
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
      {actionState.request.requestStatus === ("new" || "awaiting-deposit") && (
        <ActionField.RejectText
          title="DENY REQUEST"
          label="Please enter a reason why the request was denied:"
          stateText={actionState.deniedReason}
          dispatchType="deniedReason"
        />
      )}
      {actionState.request.requestStatus === "deposit-received" && (
        <ActionField.RejectText
          title="CANCEL APPOINTMENT"
          label="Please enter a reason why the appointment was canceled:"
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
        />
      )}
    </ModalWindow>
  );
}

export default RejectModal;
