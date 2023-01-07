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
          <GoButton text="ADD ALL TIMES" onClick={() => setAppointmentTimes(timePickerValues!)} />
          <GoButton text="REMOVE ALL TIMES" onClick={() => setAppointmentTimes([])} />
        </div>
      </div>
      <div className="add-time">
        <GoButton text="ADD TIME" onClick={() => toggleModalOpen(setIsTimesActive)} />
      </div>
    </>
  );
}

export default Controls;
