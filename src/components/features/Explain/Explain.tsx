import { ReactComponent as InfoIcon } from "assets/icons/info-icon.svg";
import ModalWindow from "components/modals/ModalWindow";
import { ReactNode, useState } from "react";
import { toggleBooleanState } from "utils/Toggle";
import "./Explain.css";

interface Props {
  children: ReactNode;
}

function InfoExplain({ children }: Props) {
  const [isExplainActive, setIsExplainActive] = useState<boolean>(false);

  return (
    <>
      <button type="button" className="info-explain_button" onClick={() => toggleBooleanState(setIsExplainActive)}>
        <InfoIcon />
      </button>
      {isExplainActive && (
        <ModalWindow
          isActive={isExplainActive}
          closeFunction={() => toggleBooleanState(setIsExplainActive)}
          children={children}
        />
      )}
    </>
  );
}

export default InfoExplain;
