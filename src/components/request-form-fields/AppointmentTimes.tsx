import { Dispatch, SetStateAction } from "react";
import { formatTime } from "../../functions/Formatting";
import ErrorMessage from "../ErrorMessage";

interface Props {
  availableAppointmentTimes: string[];
  appointmentTime: string;
  setAppointmentTime: Dispatch<SetStateAction<string>>;
  appointmentTimeError: boolean;
}

function AppointmentTimes({ availableAppointmentTimes, appointmentTime, setAppointmentTime, appointmentTimeError }: Props) {
  return (
    <>
      <div className="apt-times-container">
        <span className="label">
          <label htmlFor="aptTimes">Available Times:</label>
        </span>
        {availableAppointmentTimes.length ? (
          <select name="aptTimes" id="aptTimes" onChange={(e) => setAppointmentTime(e.target.value)} value={appointmentTime} required>
            <option value="select" disabled>
              --- Select Time ---
            </option>
            {availableAppointmentTimes!.map((time, i) => (
              <option key={i} value={time}>
                {formatTime(time)}
              </option>
            ))}
          </select>
        ) : (
          <div className="no-available-appointments">No Available Appointments</div>
        )}
        {appointmentTimeError ? <ErrorMessage message={"SELECT A TIME"} /> : ""}
      </div>
    </>
  );
}

export default AppointmentTimes;
