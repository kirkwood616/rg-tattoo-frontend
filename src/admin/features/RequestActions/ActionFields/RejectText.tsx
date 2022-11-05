import ActionContext from "admin/context/ActionContext";
import { TextRejectType } from "admin/context/ActionReducer";
import { useContext } from "react";
import { formatLcHyphen } from "utils/Formatting";

interface Props {
  title: string;
  label: string;
  stateText: string | undefined;
  dispatchType: TextRejectType;
}

function RejectText({ title, label, stateText, dispatchType }: Props) {
  const { dispatch } = useContext(ActionContext);

  return (
    <>
      <h1>{title.toUpperCase()}</h1>
      <label htmlFor={formatLcHyphen(title)}>{label}</label>
      <textarea
        name={formatLcHyphen(title)}
        id={formatLcHyphen(title)}
        value={stateText}
        onChange={(e) => dispatch({ type: dispatchType, value: e.target.value })}
      />

      {!stateText && <p>** Reason Required **</p>}

      <p>* This message will appear in the client's canceled notifaction email. *</p>
    </>
  );
}

export default RejectText;
