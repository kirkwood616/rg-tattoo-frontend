import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import { formatTime } from "../../functions/Formatting";
import ErrorMessage from "../ErrorMessage";
import SelectAppointmentTimes from "../modals/SelectAppointmentTimes";

function AppointmentTimes() {
  // CONTEXT
  let { availableAppointmentTimes, state } = useContext(RequestContext);

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
            value={formatTime(state.appointmentTime.value)}
            onClick={() => setIsTimesActive(true)}
            readOnly
          ></input>
        ) : (
          <div className="no-available-appointments">No Available Appointments</div>
        )}
        <ErrorMessage message={"SELECT A TIME"} name={"appointmentTime"} />
        {isTimesActive ? <SelectAppointmentTimes isTimesActive={isTimesActive} setIsTimesActive={setIsTimesActive} /> : ""}
      </div>
    </>
  );
}

export default AppointmentTimes;
