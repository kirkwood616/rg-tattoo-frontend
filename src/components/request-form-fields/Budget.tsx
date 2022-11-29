import { budgetBrackets } from "admin/settings/AdminSettings";
import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";

function Budget() {
  const { toggleModalOpen } = useContext(AppContext);
  const { state } = useContext(RequestContext);
  const [isBudgetActive, setIsBudgetActive] = useState(false);

  return (
    <section className="field_container">
      <label htmlFor="budget">Budget:</label>

      <input
        type="text"
        name="budget"
        id="budget"
        placeholder="--- Select Budget ---"
        value={state.budget.value}
        onClick={() => toggleModalOpen(setIsBudgetActive)}
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
    </section>
  );
}

export default Budget;
