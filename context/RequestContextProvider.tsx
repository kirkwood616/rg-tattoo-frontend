import { FieldValues } from "models/RequestReducer";
import { ReactNode, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import RequestContext from "./RequestContext";
import { initialState, requestReducer } from "./RequestReducer";

interface RequestContextProviderProps {
  children: ReactNode;
}

type FieldValueArray = [FieldValues];

export default function RequestContextProvider({ children }: RequestContextProviderProps) {
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);
  const [state, dispatch] = useImmerReducer(requestReducer, initialState);

  // CHECK FOR ERRORS & ASSIGN MAIN hasErrors
  useEffect(() => {
    const valueArray: FieldValueArray = Object.values(state) as FieldValueArray;
    const errorsExist: FieldValues | undefined = valueArray.find((item) => {
      return item.hasErrors;
    });
    if (errorsExist) {
      dispatch({ type: "hasErrors", value: true });
    } else {
      dispatch({ type: "hasErrors", value: false });
    }
  }, [dispatch, state]);

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
