import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function RequestConfirm() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <div className="request-confirm">
        <div>
          <input
            type="checkbox"
            name="requestConfirmBox"
            id="requestConfirmBox"
            className="request-confirm-box"
            checked={state.requestConfirm.value}
            onChange={() => dispatch({ type: "requestConfirm", value: !state.requestConfirm.value })}
          />
        </div>
        <div className="request-confirm-text">
          <label htmlFor="requestConfirmBox">
            I acknowledge that this submission is a request for an appointment and not confirmation of an actual appointment.
            I understand that the artist will either confirm or deny this request, the result of which will be made available
            to me through the email address I provided in this form.
          </label>
        </div>
      </div>
      <FormErrorMessage message="ACKNOWLEDGE THIS IS A REQUEST" name="requestConfirm" />
    </section>
  );
}

export default RequestConfirm;
