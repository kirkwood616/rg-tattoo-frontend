import { ReactNode, useState } from "react";
import RequestContext from "./RequestContext";
import { reducer, initialState } from "./Reducer";
import { useImmerReducer } from "use-immer";

interface Props {
  children: ReactNode;
}

export default function RequestContextProvider({ children }: Props) {
  // STATES FOR FORM
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);

  // REDUCER
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <RequestContext.Provider
      value={{
        availableAppointmentTimes,
        setAvailableAppointmentsTimes,
        state,
        dispatch,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
