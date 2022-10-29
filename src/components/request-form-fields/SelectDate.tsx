import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

function SelectDate() {
  const [maxAppointmentDate, setMaxAppointmentDate] = useState<Date>();
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);

  const { state, dispatch } = useContext(RequestContext);

  function disabledDates(date: Date): boolean {
    return date.getDay() !== 0 && date.getDay() !== 1;
  }

  function handleDateChange(date: Date) {
    dispatch({ type: "startDate", value: date });
    dispatch({ type: "appointmentTime", value: "" });
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
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={maxAppointmentDate}
          filterDate={disabledDates}
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
