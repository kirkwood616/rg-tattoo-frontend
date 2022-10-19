import "./AreYouSure.css";

import GoButton from "components/buttons/GoButton";
import { Dispatch, SetStateAction } from "react";
import ModalWindow from "./ModalWindow";

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  yesFunction: () => Promise<void>;
  yesButtonText: string;
}

function AreYouSure({ isActive, setIsActive, yesFunction, yesButtonText }: Props) {
  return (
    <ModalWindow isActive={isActive} setIsActive={setIsActive} className="yes-confirm">
      <h2>Are You Sure?</h2>
      <GoButton type="button" text={yesButtonText} backgroundColor="green" onClick={yesFunction} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsActive((current) => !current)} />
    </ModalWindow>
  );
}

export default AreYouSure;
