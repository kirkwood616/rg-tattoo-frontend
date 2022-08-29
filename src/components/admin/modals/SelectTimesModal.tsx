import { Dispatch, SetStateAction } from "react";
import { timePickerValues } from "../../../admin/AdminSettings";
import { formatTime } from "../../../utils/Formatting";
import ModalWindow from "../../modals/ModalWindow";
import "./SelectTimesModal.css";

interface Props {
  isTimesActive: boolean;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
  addTime: (time: string) => void;
}

function SelectTimesModal({ isTimesActive, setIsTimesActive, addTime }: Props) {
  function onTimeClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    addTime(e.currentTarget.value);
    setIsTimesActive(false);
  }
  return (
    <ModalWindow isActive={isTimesActive} setIsActive={setIsTimesActive} className="time-select_container">
      {timePickerValues!.map((time, index) => (
        <button value={time} key={index} className="time-option" onClick={(e) => onTimeClick(e)}>
          {formatTime(time)}
        </button>
      ))}
    </ModalWindow>
  );
}

export default SelectTimesModal;
