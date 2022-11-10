import ActionContext from "admin/context/ActionContext";
import RemoveButton from "components/buttons/RemoveButton";
import AppContext from "context/AppContext";
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
  const { toggleModalOpen } = useContext(AppContext);
  const { dispatch } = useContext(ActionContext);

  function closeClick() {
    if (isDispatch) {
      dispatch({ type: "resetWithState" });
      toggleModalOpen();
    } else {
      toggleModalOpen(setIsActive);
    }
  }

  return (
    <div className={isActive ? "ModalWindow" : "ModalWindow hide"} onClick={(e) => e.stopPropagation()}>
      <div className="modal_body">
        <RemoveButton onClick={closeClick} />
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
