import { budgetBrackets } from "admin/settings/AdminSettings";
import FormErrorMessage from "components/errors/FormErrorMessage";
import InfoExplain from "components/features/Explain/Explain";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import * as Explain from "../features/Explain";

function Budget() {
  const { toggleModalOpen } = useContext(AppContext);
  const { state } = useContext(RequestContext);
  const [isBudgetActive, setIsBudgetActive] = useState(false);

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="budget">Budget:</label>
        <InfoExplain children={<Explain.Budget />} />
      </div>

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
