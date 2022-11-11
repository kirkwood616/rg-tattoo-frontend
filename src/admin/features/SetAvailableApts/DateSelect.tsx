import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "./DateSelect.css";

interface Props {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
}

function DateSelect({ startDate, setStartDate }: Props) {
  return (
    <div className="date-picker_container">
      <span className="label">
        <label htmlFor="date-picker">Date:</label>
      </span>
      <DatePicker
        name="date-picker"
        id="date-picker"
        withPortal
        selected={startDate}
        minDate={new Date()}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
}

export default DateSelect;
