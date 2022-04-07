import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

interface Props {
  startDateError: boolean;
}

function PlacementImage({ startDateError }: Props) {
  // CONTEXT
  let { startDate, setStartDate, setAppointmentTime } = useContext(RequestContext);

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
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            setAppointmentTime("");
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
        {startDateError ? <ErrorMessage message={"Date Required"} /> : ""}
      </div>
    </>
  );
}

export default PlacementImage;
