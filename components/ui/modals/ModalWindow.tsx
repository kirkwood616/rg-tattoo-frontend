import XButton from "components/ui/buttons/XButton";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { toggleBooleanState } from "src/utils/Toggle";
import styles from "styles/ui/ModalWindow.module.css";

interface ModalWindowProps {
  setIsActive?: Dispatch<SetStateAction<boolean>>;
  closeFunction?: () => void;
  children: ReactNode;
}

function ModalWindow({ setIsActive, closeFunction, children }: ModalWindowProps) {
  function onCloseClick() {
    if (closeFunction) {
      closeFunction();
    } else if (setIsActive) {
      toggleBooleanState(setIsActive);
    }
  }

  return (
    <div className={styles.ModalWindow} onClick={onCloseClick}>
      <div className={styles.modal__body} onClick={(e) => e.stopPropagation()}>
        <XButton onClick={onCloseClick} />
        <div className={styles.modal__content__container}>
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
