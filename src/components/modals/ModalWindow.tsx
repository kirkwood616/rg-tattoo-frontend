import ActionContext from "admin/context/ActionContext";
import RemoveButton from "components/buttons/RemoveButton";
import AppContext from "context/AppContext";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef } from "react";
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
  const bodyRef = useRef<HTMLDivElement>(null);

  function closeClick() {
    if (closeFunction) return closeFunction();
    if (isDispatch) {
      dispatch({ type: "resetWithState" });
      toggleModalOpen();
    } else {
      return toggleModalOpen(setIsActive);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (bodyRef.current && !bodyRef.current.contains(event.target as Element)) {
        closeClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyRef]);

  return (
    <div className="ModalWindow">
      <div className="modal_body" ref={bodyRef}>
        <RemoveButton onClick={() => closeClick()} />
        <div className="modal_content">{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
