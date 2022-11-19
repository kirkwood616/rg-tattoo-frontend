import RemoveButton from "components/buttons/RemoveButton";
import AppContext from "context/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { formatTimeNoLeadingZero } from "utils/Formatting";
import "./SelectedTimes.css";

interface Props {
  appointmentTimes: string[];
  removeTime: (index: number) => void;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
}

function SelectedTimes({ appointmentTimes, removeTime, setIsTimesActive }: Props) {
  const { toggleModalOpen } = useContext(AppContext);

  return (
    <>
      <TransitionGroup className="available-times_container">
        {appointmentTimes.length > 0 &&
          appointmentTimes.map((time, index) => (
            <CSSTransition key={time} timeout={250} classNames="time">
              <div className="time">
                <span className="available-time">{formatTimeNoLeadingZero(time)}</span>
                <RemoveButton onClick={() => removeTime(index)} />
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>

      <CSSTransition in={!appointmentTimes.length} unmountOnExit timeout={50} classNames="no-times-set">
        <div className="no-times-set" onClick={() => toggleModalOpen(setIsTimesActive)}>
          NO TIMES SET
        </div>
      </CSSTransition>
    </>
  );
}

export default SelectedTimes;
