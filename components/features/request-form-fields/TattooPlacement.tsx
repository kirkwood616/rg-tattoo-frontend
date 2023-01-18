import * as Explain from "components/features/request-form-fields/explain/";
import FormError from "components/ui/errors/FormError";
import ExplainInfo from "components/ui/explain-info/ExplainInfo";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

export default function TattooPlacement() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="tattooPlacement">
        <ExplainInfo>
          <Explain.Placement />
        </ExplainInfo>
      </Form.Label>
      <input
        type="text"
        name="tattooPlacement"
        id="tattooPlacement"
        maxLength={30}
        onChange={(e) => dispatch({ type: "tattooPlacement", value: e.target.value })}
        value={state.tattooPlacement.value}
      />
      {state.tattooPlacement.hasErrors && state.tattooPlacement.checkCount > 0 && (
        <FormError errorMessage={"PLEASE ENTER A TATTOO PLACEMENT"} name={"tattooPlacement"} />
      )}
    </Form.Field>
  );
}
