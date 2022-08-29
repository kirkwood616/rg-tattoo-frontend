import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import { formatTime } from "../../utils/Formatting";
import SelectAppointmentTimes from "../modals/SelectAppointmentTimes";
import FormErrorMessage from "./FormErrorMessage";

function AppointmentTimes() {
  // CONTEXT
  const { availableAppointmentTimes, state } = useContext(RequestContext);

  // STATE
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);

  return (
    <>
      <div className="apt-times-container">
        <span className="label">
          <label htmlFor="aptTimes">Available Times:</label>
        </span>
        {availableAppointmentTimes.length > 0 && (
          <>
            <input
              type="text"
              name="time-picker"
              id="time-picker"
              placeholder="--- Select Time ---"
              value={formatTime(state.appointmentTime.value)}
              onClick={() => setIsTimesActive(true)}
              readOnly
            ></input>
            <FormErrorMessage message={"SELECT A TIME"} name={"appointmentTime"} />
          </>
        )}
        {!availableAppointmentTimes.length && <div className="no-available-appointments">No Available Appointments</div>}

        {isTimesActive && <SelectAppointmentTimes isTimesActive={isTimesActive} setIsTimesActive={setIsTimesActive} />}
      </div>
    </>
  );
}

export default AppointmentTimes;
