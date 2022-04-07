import { Dispatch, ReactNode, SetStateAction } from "react";
import "./ModalWindow.css";

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  className: string;
  children: ReactNode;
}

function ModalWindow({ isActive, setIsActive, className, children }: Props) {
  return (
    <div className={isActive ? "ModalWindow" : "ModalWindow hide"} onClick={() => setIsActive(false)}>
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
