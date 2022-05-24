import { RequestReducer } from "../models/RequestReducer";
import { StateFields } from "../models/StateFields";

export function isTextDisabled(state: RequestReducer, field: StateFields): boolean {
  if (!state.appointmentTime.value.length) {
    return true;
  } else {
    return false;
  }
}

export function isNumberDisabled(state: RequestReducer): boolean {
  if (!state.appointmentTime.value.length) {
    return true;
  } else {
    return false;
  }
}
