import { useContext } from "react";
import RequestContext from "../context/RequestContext";
import { FieldValues, RequestReducer } from "../models/RequestReducer";
import "./ErrorMessage.css";

interface Props {
  loginError?: boolean;
  name?: string;
  message: string;
}

function ErrorMessage({ loginError, name, message }: Props) {
  // CONTEXT
  let { state } = useContext(RequestContext);

  // CLASSNAMES
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

  // FUNCTIONS
  function getError(state: RequestReducer, key: keyof RequestReducer): boolean {
    const fieldValues: FieldValues = state[key] as FieldValues;
    return fieldValues.hasErrors;
  }

  return <>{name ? <div className={fieldClassName}>{getError(state, name!) ? message : ""}</div> : <div className={loginClassName}>{loginError ? message : ""}</div>}</>;
}

export default ErrorMessage;
