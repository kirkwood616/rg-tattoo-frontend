import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
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
            dispatch({ type: "startDate", value: date });
            dispatch({ type: "appointmentTime", value: "" });
          }}
          minDate={new Date()}
          maxDate={maxAppointmentDate}
          filterDate={disableSundayMonday}
          excludeDates={excludedDates}
          isClearable
          withPortal
          autoComplete="off"
          required
        />
      </div>
      <FormErrorMessage message={"SELECT DATE"} name={"startDate"} />
    </>
  );
}

export default SelectDate;
