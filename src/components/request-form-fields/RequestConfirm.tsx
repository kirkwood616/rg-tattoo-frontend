import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import FormErrorMessage from "../errors/FormErrorMessage";

function RequestConfirm() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <div className="request-confirm">
        <div>
          <input
            type="checkbox"
            name="requestConfirmBox"
            id="requestConfirmBox"
            className="request-confirm-box"
            onChange={() => dispatch({ type: "requestConfirm", value: !state.requestConfirm.value })}
          />
        </div>
        <div className="request-confirm-text">
          <label htmlFor="requestConfirmBox" className={state.appointmentTime.value ? "label" : "label disabled"}>
            I acknowledge that this submission is a request for an appointment and not confirmation of an actual appointment. I understand that the artist will either confirm
            or deny this request, the result of which will be made available to me through the email address I provided in this form.
          </label>
        </div>
      </div>
      <FormErrorMessage message="ACKNOWLEDGE THIS IS A REQUEST" name="requestConfirm" />
    </>
  );
}

export default RequestConfirm;
