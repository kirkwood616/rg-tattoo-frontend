import { ReactNode, useEffect, useState } from "react";
import RequestContext from "./RequestContext";
import { reducer, initialState } from "./Reducer";
import { useImmerReducer } from "use-immer";
import { FieldValues } from "../models/RequestReducer";

interface Props {
  children: ReactNode;
}

type FieldValueArray = [FieldValues];

export default function RequestContextProvider({ children }: Props) {
  // STATE
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);

  // REDUCER
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // CHECK FOR ERRORS & ASSIGN MAIN hasErrors
  useEffect(() => {
    let valueArray: FieldValueArray = Object.values(state) as FieldValueArray;
    let errorsExist: FieldValues | undefined = valueArray.find((item) => {
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
