import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";
import styles from "styles/features/RequestConfirm.module.css";

function RequestConfirm() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <div className={styles.RequestConfirm}>
        <div className={styles.checkbox__container}>
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
      {state.requestConfirm.hasErrors && state.requestConfirm.checkCount > 0 && (
        <FormError errorMessage="ACKNOWLEDGE THIS IS A REQUEST" name="requestConfirm" />
      )}
    </Form.Field>
  );
}

export default RequestConfirm;
