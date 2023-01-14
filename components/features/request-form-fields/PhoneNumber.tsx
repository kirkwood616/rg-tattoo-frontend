import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function PhoneNumber() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="phoneNumber" />
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        onChange={(e) => dispatch({ type: "phoneNumber", value: e.target.value })}
        value={state.phoneNumber.value}
      />
      {state.phoneNumber.hasErrors && state.phoneNumber.checkCount > 0 && (
        <FormError errorMessage={"PHONE NUMBER IS NOT VALID"} name={"phoneNumber"} />
      )}
    </Form.Field>
  );
}
