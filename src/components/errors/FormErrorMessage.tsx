import RequestContext from "context/RequestContext";
import { FieldValues, RequestReducer } from "models/RequestReducer";
import { StateFields } from "models/StateFields";
import { useContext } from "react";

interface Props {
  message: string;
  name: StateFields;
}

function FormErrorMessage({ message, name }: Props) {
  const { state } = useContext(RequestContext);

  let fieldClassName: string = "";

  if ((state[name].checkCount && getError(state, name)) || (state.submitCount > 0 && getError(state, name))) {
    fieldClassName = "ErrorMessage";
  } else {
    fieldClassName = "hidden";
  }

  function getError(state: RequestReducer, key: keyof RequestReducer): boolean {
    const fieldValues: FieldValues = state[key] as FieldValues;
    return fieldValues.hasErrors;
  }
  return (
    <>
      <div className={fieldClassName}>{getError(state, name) && message}</div>
    </>
  );
}

export default FormErrorMessage;
