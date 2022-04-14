import { Dispatch, SetStateAction } from "react";
import { formatTime } from "../../../utils/Formatting";
import ModalWindow from "../../modals/ModalWindow";
import "./SelectTimesModal.css";

interface Props {
  timeValues: string[] | void;
  isTimesActive: boolean;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<string>>;
}

function SelectTimesModal({ timeValues, isTimesActive, setIsTimesActive, setStartTime }: Props) {
  function onTimeClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setStartTime(e.currentTarget.value);
    setIsTimesActive(false);
  }
  return (
    <ModalWindow isActive={isTimesActive} setIsActive={setIsTimesActive} className="time-select_container">
      {timeValues!.map((time, index) => (
        <button value={time} key={index} className="time-option" onClick={(e) => onTimeClick(e)}>
          {formatTime(time)}
        </button>
      ))}
    </ModalWindow>
  );
}

export default SelectTimesModal;
