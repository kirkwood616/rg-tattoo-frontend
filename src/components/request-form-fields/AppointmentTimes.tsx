import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import { formatTimeNoLeadingZero } from "utils/Formatting";

function AppointmentTimes() {
  // CONTEXT
  const { availableAppointmentTimes, state } = useContext(RequestContext);

  // STATE
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);

  return (
    <>
      <div className="apt-times-container">
        {availableAppointmentTimes.length > 0 && (
          <>
            <span className="label">
              <label htmlFor="aptTimes">Available Times:</label>
            </span>
            <input
              type="text"
              name="time-picker"
              id="time-picker"
              placeholder="--- Select Time ---"
              value={formatTimeNoLeadingZero(state.appointmentTime.value)}
              onClick={() => setIsTimesActive(true)}
              readOnly
            ></input>
            <FormErrorMessage message={"SELECT A TIME"} name={"appointmentTime"} />
          </>
        )}
        {!availableAppointmentTimes.length && <FormErrorMessage message={`NO AVAILABLE TIMES. PLEASE SELECT ANOTHER DATE`} name={"appointmentTime"} />}

        {isTimesActive && (
          <SelectList
            isSelectActive={isTimesActive}
            setIsSelectActive={setIsTimesActive}
            selectList={availableAppointmentTimes}
            actionType="appointmentTime"
            formatter={formatTimeNoLeadingZero}
          />
        )}
        {/* {isTimesActive && <SelectAppointmentTimes isTimesActive={isTimesActive} setIsTimesActive={setIsTimesActive} />} */}
      </div>
    </>
  );
}

export default AppointmentTimes;
