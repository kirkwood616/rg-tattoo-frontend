import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function PlacementImage() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

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
        {state.startDate.hasErrors ? <ErrorMessage message={"Date Required"} /> : ""}
      </div>
    </>
  );
}

export default PlacementImage;
