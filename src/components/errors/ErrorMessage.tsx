import RequestContext from "context/RequestContext";
import { FieldValues, RequestReducer } from "models/RequestReducer";
import { useContext } from "react";
import "./ErrorMessage.css";

interface Props {
  loginError?: boolean;
  name?: string;
  message: string;
}

function ErrorMessage({ loginError, name, message }: Props) {
  const { state } = useContext(RequestContext);

  let fieldClassName: string = "";
  let loginClassName: string = "";

  if (name && getError(state, name)) {
    fieldClassName = "ErrorMessage";
  } else {
    fieldClassName = "hidden";
  }

  if (loginError) {
    loginClassName = "ErrorMessage";
  } else {
    loginClassName = "hidden";
  }

  function getError(state: RequestReducer, key: keyof RequestReducer): boolean {
    const fieldValues: FieldValues = state[key] as FieldValues;
    return fieldValues.hasErrors;
  }

  if (name) return <div className={fieldClassName}>{getError(state, name!) && message}</div>;
  else return <div className={loginClassName}>{loginError && message}</div>;
}

export default ErrorMessage;
