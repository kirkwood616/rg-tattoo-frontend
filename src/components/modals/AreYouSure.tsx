import GoButton from "components/buttons/GoButton";
import AppContext from "context/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import "./AreYouSure.css";
import ModalWindow from "./ModalWindow";

interface Props {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  yesFunction: () => Promise<void> | void;
  yesButtonText: string;
  subModal?: boolean;
}

function AreYouSure({ isActive, setIsActive, yesFunction, yesButtonText, subModal }: Props) {
  const { toggleModalOpen } = useContext(AppContext);

  function handleCancel() {
    if (subModal) setIsActive((current) => !current);
    else toggleModalOpen(setIsActive);
  }

  return (
    <ModalWindow isActive={isActive} closeFunction={handleCancel} className="yes-confirm">
      <div className="are-you-sure">
        <h2>Are You Sure?</h2>
        <GoButton type="button" text={yesButtonText} backgroundColor="green" onClick={yesFunction} />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={handleCancel} />
      </div>
    </ModalWindow>
  );
}

export default AreYouSure;
