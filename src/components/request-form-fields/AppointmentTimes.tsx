import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import { formatTime } from "../../functions/Formatting";
import SelectTimesModal from "../admin/modals/SelectTimesModal";
import ErrorMessage from "../ErrorMessage";

function AppointmentTimes() {
  // CONTEXT
  let { availableAppointmentTimes, appointmentTime, setAppointmentTime, state } = useContext(RequestContext);

  // STATE
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
        {state.appointmentTimeError ? <ErrorMessage message={"SELECT A TIME"} /> : ""}
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
