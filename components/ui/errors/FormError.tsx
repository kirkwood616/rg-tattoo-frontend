import RequestContext from "context/RequestContext";
import { FieldValues, RequestReducer } from "models/RequestReducer";
import { StateFields } from "models/StateFields";
import { useContext } from "react";
import ErrorBubble from "./ErrorBubble";

interface FormErrorProps {
  errorMessage: string;
  name: StateFields;
}

export default function FormError({ errorMessage, name }: FormErrorProps) {
  const { state } = useContext(RequestContext);

  function getError(state: RequestReducer, key: keyof RequestReducer): boolean {
    const fieldValues: FieldValues = state[key] as FieldValues;
    return fieldValues.hasErrors;
  }
  return <>{getError(state, name) && <ErrorBubble errorMessage={errorMessage} />}</>;
}
