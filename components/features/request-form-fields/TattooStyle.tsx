import * as Explain from "components/features/request-form-fields/explain/";
import FormError from "components/ui/errors/FormError";
import ExplainInfo from "components/ui/explain-info/ExplainInfo";
import * as Form from "components/ui/form";
import SelectList from "components/ui/select-list/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import { tattooStyles } from "settings/Values";
import { toggleBooleanState } from "utils/Toggle";

export default function TattooStyle() {
  const [isStyleActive, setIsStyleActive] = useState<boolean>(false);
  const { state } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="tattooStyle">
        <ExplainInfo>
          <Explain.Style />
        </ExplainInfo>
      </Form.Label>
      <input
        type="text"
        name="tattooStyle"
        id="tattooStyle"
        placeholder="--- Select Style ---"
        value={state.tattooStyle.value}
        onClick={() => toggleBooleanState(setIsStyleActive)}
        readOnly
      />
      {state.tattooStyle.hasErrors && state.tattooStyle.checkCount > 0 && (
        <FormError errorMessage={"PLEASE SELECT A TATTOO STYLE"} name={"tattooStyle"} />
      )}

      {isStyleActive && (
        <SelectList
          isSelectActive={isStyleActive}
          setIsSelectActive={setIsStyleActive}
          selectList={tattooStyles}
          actionType="tattooStyle"
        />
      )}
    </Form.Field>
  );
}
