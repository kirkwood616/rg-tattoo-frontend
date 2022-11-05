import ActionContext from "admin/context/ActionContext";
import { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import "./ModalWindow.css";

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  isDispatch?: boolean;
  className?: string;
  children: ReactNode;
}

function ModalWindow({ isActive, setIsActive, isDispatch, className, children }: Props) {
  const { dispatch } = useContext(ActionContext);

  function setOrDispatch() {
    if (isDispatch) {
      return dispatch({ type: "resetWithState" });
    } else {
      return setIsActive((current) => !current);
    }
  }

  return (
    <div className={isActive ? "ModalWindow" : "ModalWindow hide"} onClick={setOrDispatch}>
      <div className="modal_body" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
