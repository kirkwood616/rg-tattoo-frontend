import { ReactNode, useEffect, useState } from "react";
import RequestContext from "./RequestContext";
import { reducer, initialState } from "./Reducer";
import { useImmerReducer } from "use-immer";
import { RequestReducer } from "../models/RequestReducer";

interface Props {
  children: ReactNode;
}

export default function RequestContextProvider({ children }: Props) {
  // STATES FOR FORM
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);

  // REDUCER
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  // useEffect(() => {
  //   if (Object.keys(state.hasErrors))
  // })
  // let stateArray = [{ ...state }];
  // stateArray.map((field) => {
  //   console.log(field.hasErrors);
  // });
  // console.log(state);

  // for (const [key, value] of Object.entries(state)) {
  //   console.log(`${key}: ${value}`);
  // }

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
