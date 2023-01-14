import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function TattooDescription() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="tattooDescription" />
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        placeholder="Enter a description..."
        onChange={(e) => dispatch({ type: "tattooDescription", value: e.target.value })}
        value={state.tattooDescription.value}
        minLength={7}
      />
      {state.tattooDescription.hasErrors && state.tattooDescription.checkCount > 0 && (
        <FormError errorMessage={"MUST BE AT LEAST 7 CHARACTERS"} name={"tattooDescription"} />
      )}
    </Form.Field>
  );
}
