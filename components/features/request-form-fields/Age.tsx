import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function Age() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="age" />
      <input
        type="number"
        name="age"
        id="age"
        min={18}
        max={100}
        onChange={(e) => dispatch({ type: "age", value: Number(e.target.value) })}
        value={state.age.value || ""}
      />
      {state.age.hasErrors && state.age.checkCount > 0 && <FormError errorMessage={"MUST BE 18 OR OLDER"} name={"age"} />}
    </Form.Field>
  );
}
