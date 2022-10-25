import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

function SelectDate() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  // STATES
  const [maxAppointmentDate, setMaxAppointmentDate] = useState<Date>();
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);

  // DIABLE OFF-DAYS OF SUNDAY & MONDAYS ON CALENDAR
  function disableSundayMonday(date: Date): boolean {
    return date.getDay() !== 0 && date.getDay() !== 1;
  }

  // console.log(state.startDate.value?.toLocaleDateString("en-Us", { timeZone: "America/Detroit" }));
  console.log(state.startDate.value ? state.startDate.value.toISOString() : "fuck");

  console.log(state.startDate.value ? format(state.startDate.value, "MM/dd/yyyy") : state.startDate.value);

  return (
    <>
      <span className="label">
        <label htmlFor="datePicker">Select Date:</label>
      </span>
      <div className="calendarContainer">
        <DatePicker
          name="datePicker"
          id="datePicker"
          placeholderText="Select Date"
          selected={state.startDate.value}
          onChange={(date: Date) => {
            if (date === null) {
              dispatch({ type: "startDate", value: undefined });
            } else {
              dispatch({ type: "startDate", value: date });
            }
            dispatch({ type: "appointmentTime", value: "" });
          }}
          minDate={new Date()}
          maxDate={maxAppointmentDate}
          filterDate={disableSundayMonday}
          excludeDates={excludedDates}
          autoComplete="off"
          isClearable
          withPortal
          required
        />
      </div>
      <FormErrorMessage message={"SELECT DATE"} name={"startDate"} />
    </>
  );
}

export default SelectDate;
