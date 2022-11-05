import ActionContext from "admin/context/ActionContext";
import { PriceActionType } from "admin/context/ActionReducer";
import { useContext } from "react";
import { formatLcHyphen } from "utils/Formatting";

interface Props {
  title: string;
  label: string;
  statePrice: number | undefined;
  dispatchType: PriceActionType;
}

function SubmitPrice({ title, label, statePrice, dispatchType }: Props) {
  const { dispatch } = useContext(ActionContext);

  return (
    <>
      <h1>{title.toUpperCase()}</h1>
      <label htmlFor={formatLcHyphen(label)}>{label}:</label>
      <input
        type="number"
        name={formatLcHyphen(label)}
        id={formatLcHyphen(label)}
        min={0}
        value={statePrice?.toString()}
        onChange={(e) => dispatch({ type: dispatchType, value: e.target.valueAsNumber })}
      />
    </>
  );
}

export default SubmitPrice;
