import ActionContext from "admin/context/ActionContext";
import RemoveButton from "components/buttons/RemoveButton";
import AppContext from "context/AppContext";
import { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import "./ModalWindow.css";

interface Props {
  isActive: boolean;
  setIsActive?: Dispatch<SetStateAction<boolean>>;
  closeFunction?: () => void;
  isDispatch?: boolean;
  className?: string;
  children: ReactNode;
}

function ModalWindow({ isActive, setIsActive, closeFunction, isDispatch, className, children }: Props) {
  const { toggleModalOpen } = useContext(AppContext);
  const { dispatch } = useContext(ActionContext);

  function closeClick() {
    if (closeFunction) return closeFunction();
    if (isDispatch) {
      dispatch({ type: "resetWithState" });
      toggleModalOpen();
    } else {
      return toggleModalOpen(setIsActive);
    }
  }

  return (
    <div className="ModalWindow" onClick={closeClick}>
      <div className="modal_body" onClick={(e) => e.stopPropagation()}>
        <RemoveButton onClick={() => closeClick()} />
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
