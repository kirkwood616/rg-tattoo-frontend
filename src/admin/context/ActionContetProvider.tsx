import { ReactNode } from "react";
import { useImmerReducer } from "use-immer";
import ActionContext from "./ActionContext";
import { actionReducer, initialActionState } from "./ActionReducer";

interface Props {
  children: ReactNode;
}

function ActionContextProvider({ children }: Props) {
  const [actionState, dispatch] = useImmerReducer(actionReducer, initialActionState);

  function dispatchIsActionActive() {
    dispatch({ type: "isActionActive" });
  }

  function dispatchIsRejectActive() {
    dispatch({ type: "isRejectActive" });
  }

  return (
    <ActionContext.Provider value={{ actionState, dispatch, dispatchIsActionActive, dispatchIsRejectActive }}>
      {children}
    </ActionContext.Provider>
  );
}

export default ActionContextProvider;
