import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function Email() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="email" />
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => dispatch({ type: "email", value: e.target.value })}
        value={state.email.value}
      />
      {state.email.hasErrors && state.email.checkCount > 0 && (
        <FormError errorMessage={"E-MAIL IS NOT VALID"} name={"email"} />
      )}
    </Form.Field>
  );
}
