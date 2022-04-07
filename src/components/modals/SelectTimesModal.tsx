import { Dispatch, SetStateAction } from "react";
import { timePickerValues } from "../../admin/AdminSettings";
import { formatTime } from "../../functions/Formatting";
import ModalWindow from "./ModalWindow";
import "./SelectTimesModal.css";

interface Props {
  isTimesActive: boolean;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
  setStartTime: Dispatch<SetStateAction<string>>;
}

function SelectTimesModal({ isTimesActive, setIsTimesActive, setStartTime }: Props) {
  function onTimeClick(e: React.MouseEvent<HTMLOptionElement, MouseEvent>) {
    setStartTime(e.currentTarget.value);
    setIsTimesActive(false);
  }
  return (
    <ModalWindow isActive={isTimesActive} setIsActive={setIsTimesActive} className="time-select_container">
      {timePickerValues!.map((time, index) => (
        <option value={time} key={index} className="time-option" onClick={(e) => onTimeClick(e)}>
          {formatTime(time)}
        </option>
      ))}
    </ModalWindow>
  );
}

export default SelectTimesModal;
