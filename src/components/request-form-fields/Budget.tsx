import { budgetBrackets } from "admin/settings/AdminSettings";
import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";

function Budget() {
  const { state } = useContext(RequestContext);
  const [isBudgetActive, setIsBudgetActive] = useState(false);

  return (
    <>
      <label htmlFor="budget">Budget:</label>

      <input
        type="text"
        name="budget"
        id="budget"
        placeholder="--- Select Budget ---"
        value={state.budget.value}
        onClick={() => setIsBudgetActive((current) => !current)}
        readOnly
      />

      <FormErrorMessage message={"PLEASE SELECT A BUDGET"} name={"budget"} />

      {isBudgetActive && (
        <SelectList
          isSelectActive={isBudgetActive}
          setIsSelectActive={setIsBudgetActive}
          selectList={budgetBrackets}
          actionType="budget"
        />
      )}
    </>
  );
}

export default Budget;
