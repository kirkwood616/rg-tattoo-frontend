import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import { formatTimeNoLeadingZero } from "utils/Formatting";

function AppointmentTimes() {
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);

  const { toggleModalOpen } = useContext(AppContext);
  const { availableAppointmentTimes, state } = useContext(RequestContext);

  if (!availableAppointmentTimes.length)
    return <FormErrorMessage message={`NO AVAILABLE TIMES. PLEASE SELECT ANOTHER DATE`} name={"appointmentTime"} />;
  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="time-picker">Available Times:</label>
      </div>
      <input
        type="text"
        name="time-picker"
        id="time-picker"
        placeholder="--- Select Time ---"
        value={formatTimeNoLeadingZero(state.appointmentTime.value)}
        onClick={() => toggleModalOpen(setIsTimesActive)}
        readOnly
      ></input>
      <FormErrorMessage message={"SELECT A TIME"} name={"appointmentTime"} />

      {isTimesActive && (
        <SelectList
          isSelectActive={isTimesActive}
          setIsSelectActive={setIsTimesActive}
          selectList={availableAppointmentTimes}
          actionType="appointmentTime"
          formatter={formatTimeNoLeadingZero}
        />
      )}
    </section>
  );
}

export default AppointmentTimes;
