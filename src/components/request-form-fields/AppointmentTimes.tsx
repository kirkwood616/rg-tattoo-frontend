import { Dispatch, SetStateAction, useState } from "react";
import { formatTime } from "../../functions/Formatting";
import SelectTimesModal from "../admin/modals/SelectTimesModal";
import ErrorMessage from "../ErrorMessage";

interface Props {
  availableAppointmentTimes: string[];
  appointmentTime: string;
  setAppointmentTime: Dispatch<SetStateAction<string>>;
  appointmentTimeError: boolean;
}

function AppointmentTimes({ availableAppointmentTimes, appointmentTime, setAppointmentTime, appointmentTimeError }: Props) {
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);

  return (
    <>
      <div className="apt-times-container">
        <span className="label">
          <label htmlFor="aptTimes">Available Times:</label>
        </span>
        {availableAppointmentTimes.length ? (
          <input
            type="text"
            name="time-picker"
            id="time-picker"
            placeholder="--- Select Time ---"
            value={formatTime(appointmentTime)}
            onClick={() => setIsTimesActive(true)}
            readOnly
          ></input>
        ) : (
          <div className="no-available-appointments">No Available Appointments</div>
        )}
        {appointmentTimeError ? <ErrorMessage message={"SELECT A TIME"} /> : ""}
        {isTimesActive ? (
          <SelectTimesModal timeValues={availableAppointmentTimes} isTimesActive={isTimesActive} setIsTimesActive={setIsTimesActive} setStartTime={setAppointmentTime} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default AppointmentTimes;
