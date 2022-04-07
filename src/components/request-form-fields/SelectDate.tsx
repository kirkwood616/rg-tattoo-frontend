import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import ErrorMessage from "../ErrorMessage";

interface Props {
  startDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  startDateError: boolean;
}

function PlacementImage({ startDate, setStartDate, startDateError }: Props) {
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
          onChange={(date: Date) => setStartDate(date)}
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
