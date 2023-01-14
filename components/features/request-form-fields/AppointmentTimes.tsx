import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import SelectList from "components/ui/select-list/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import { formatTimeNoLeadingZero } from "utils/Formatting";
import { toggleBooleanState } from "utils/Toggle";

export default function AppointmentTimes() {
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);
  const { availableAppointmentTimes, state } = useContext(RequestContext);

  if (!availableAppointmentTimes.length)
    return <FormError errorMessage={`NO AVAILABLE TIMES. PLEASE SELECT ANOTHER DATE`} name={"appointmentTime"} />;
  return (
    <Form.Field>
      <Form.Label labelID="selectTime" />
      <input
        type="text"
        name="selectTime"
        id="selectTime"
        placeholder="--- Select Time ---"
        value={formatTimeNoLeadingZero(state.appointmentTime.value)}
        onClick={() => toggleBooleanState(setIsTimesActive)}
        readOnly
      />
      {state.appointmentTime.hasErrors && state.appointmentTime.checkCount > 0 && (
        <FormError errorMessage={"SELECT A TIME"} name={"appointmentTime"} />
      )}
      {isTimesActive && (
        <SelectList
          isSelectActive={isTimesActive}
          setIsSelectActive={setIsTimesActive}
          selectList={availableAppointmentTimes}
          actionType="appointmentTime"
          formatter={formatTimeNoLeadingZero}
        />
      )}
    </Form.Field>
  );
}
