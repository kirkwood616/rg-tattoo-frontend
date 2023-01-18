import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function FirstName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="firstName" />
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => dispatch({ type: "firstName", value: e.target.value })}
        value={state.firstName.value}
      />
      {state.firstName.hasErrors && state.firstName.checkCount > 0 && (
        <FormError errorMessage="FIRST NAME REQUIRED" name={"firstName"} />
      )}
    </Form.Field>
  );
}
