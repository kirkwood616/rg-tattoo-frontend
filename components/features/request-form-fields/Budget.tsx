import * as Explain from "components/features/request-form-fields/explain/";
import FormError from "components/ui/errors/FormError";
import ExplainInfo from "components/ui/explain-info/ExplainInfo";
import * as Form from "components/ui/form";
import SelectList from "components/ui/select-list/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import { budgetBrackets } from "settings/Values";
import { toggleBooleanState } from "utils/Toggle";

export default function Budget() {
  const [isBudgetActive, setIsBudgetActive] = useState<boolean>(false);
  const { state } = useContext(RequestContext);

  return (
    <Form.Field>
      <Form.Label labelID="budget">
        <ExplainInfo>
          <Explain.Budget />
        </ExplainInfo>
      </Form.Label>
      <input
        type="text"
        name="budget"
        id="budget"
        placeholder="--- Select Budget ---"
        value={state.budget.value}
        onClick={() => toggleBooleanState(setIsBudgetActive)}
        readOnly
      />

      {state.budget.hasErrors && state.budget.checkCount > 0 && (
        <FormError errorMessage={"PLEASE SELECT A BUDGET"} name={"budget"} />
      )}

      {isBudgetActive && (
        <SelectList
          isSelectActive={isBudgetActive}
          setIsSelectActive={setIsBudgetActive}
          selectList={budgetBrackets}
          actionType="budget"
        />
      )}
    </Form.Field>
  );
}
