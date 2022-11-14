import { timePickerValues } from "admin/settings/AdminSettings";
import GoButton from "components/buttons/GoButton";
import AppContext from "context/AppContext";
import { Dispatch, SetStateAction, useContext } from "react";
import "./Controls.css";

interface Props {
  setAppointmentTimes: Dispatch<SetStateAction<string[]>>;
  setIsTimesActive: Dispatch<SetStateAction<boolean>>;
}

function Controls({ setAppointmentTimes, setIsTimesActive }: Props) {
  const { toggleModalOpen } = useContext(AppContext);

  return (
    <>
      <div className="Controls">
        <div className="all-times_container">
          <GoButton
            type="button"
            text="ADD ALL TIMES"
            backgroundColor="var(--dark-gray-1)"
            onClick={() => setAppointmentTimes(timePickerValues!)}
          />
          <GoButton
            type="button"
            text="REMOVE ALL TIMES"
            backgroundColor="var(--dark-gray-1)"
            onClick={() => setAppointmentTimes([])}
          />
        </div>
      </div>
      <div className="add-time">
        <GoButton type="button" text="ADD TIME" onClick={() => toggleModalOpen(setIsTimesActive)} />
      </div>
    </>
  );
}

export default Controls;