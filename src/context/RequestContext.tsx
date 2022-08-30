import { RequestAction, RequestReducer } from "models/RequestReducer";
import { createContext, Dispatch, SetStateAction } from "react";
import { initialState } from "./RequestReducer";

interface RequestContextModel {
  availableAppointmentTimes: string[];
  setAvailableAppointmentsTimes: Dispatch<SetStateAction<string[]>>;
  state: RequestReducer;
  dispatch: Dispatch<RequestAction>;
}

const defaultValue: RequestContextModel = {
  availableAppointmentTimes: [],
  setAvailableAppointmentsTimes: () => {},
  state: initialState,
  dispatch: () => {},
};

const RequestContext = createContext(defaultValue);

export default RequestContext;
