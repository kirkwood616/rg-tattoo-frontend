import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { formatTime } from "../../utils/Formatting";
import ModalWindow from "./ModalWindow";

interface Props {
  isTimesActive: boolean;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
}

function SelectAppointmentTimes({ isTimesActive, setIsTimesActive }: Props) {
  // CONTEXT
  const { availableAppointmentTimes, dispatch } = useContext(RequestContext);

  function onTimeClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch({ type: "appointmentTime", value: e.currentTarget.value });
    setIsTimesActive(false);
  }
  return (
    <ModalWindow isActive={isTimesActive} setIsActive={setIsTimesActive} className="time-select_container">
      {availableAppointmentTimes.map((time, index) => (
        <button value={time} key={time + index} className="time-option" onClick={(e) => onTimeClick(e)}>
          {formatTime(time)}
        </button>
      ))}
    </ModalWindow>
  );
}

export default SelectAppointmentTimes;
