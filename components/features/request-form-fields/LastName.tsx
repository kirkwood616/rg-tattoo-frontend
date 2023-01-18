import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function LastName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="lastName" />
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => dispatch({ type: "lastName", value: e.target.value })}
        value={state.lastName.value}
      />
      {state.lastName.hasErrors && state.lastName.checkCount > 0 && (
        <FormError errorMessage={"LAST NAME REQUIRED"} name={"lastName"} />
      )}
    </Form.Field>
  );
}
