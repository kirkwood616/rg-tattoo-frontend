import ActionContext from "admin/context/ActionContext";
import ActionModal from "admin/modals/ActionModal";
import RejectModal from "admin/modals/RejectModal";
import { actionButtonsText, defaultButtonsText } from "admin/utils/ActionHelpers";
import GoButton from "components/buttons/GoButton";
import Error404 from "components/errors/Error404";
import { useContext, useEffect, useState } from "react";

function OpenRequestActions() {
  const { actionState, dispatchIsActionActive, dispatchIsRejectActive } = useContext(ActionContext);

  const [buttonsText, setButtonsText] = useState(defaultButtonsText);

  useEffect(() => {
    if (!actionState.request) {
      return;
    } else {
      const textForButtons = actionButtonsText(actionState.request.requestStatus);
      setButtonsText(textForButtons);
    }
  }, [actionState.request]);

  if (!actionState.request) return <Error404 />;
  return (
    <div className="ReqActions" style={{ display: "flex", flexDirection: "column" }}>
      <GoButton type="button" text={buttonsText.actionText} backgroundColor="green" onClick={dispatchIsActionActive} />
      <GoButton type="button" text={buttonsText.rejectText} backgroundColor="red" onClick={dispatchIsRejectActive} />
      {actionState.isActionActive && <ActionModal />}
      {actionState.isRejectActive && <RejectModal />}
    </div>
  );
}

export default OpenRequestActions;
