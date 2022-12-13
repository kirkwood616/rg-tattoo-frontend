import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import AvailableAppointments from "models/AvailableAppointments";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import { populateHighlights } from "utils/DatePicker";

interface Props {
  available: AvailableAppointments[] | undefined;
}

function SelectDate({ available }: Props) {
  const { state, dispatch } = useContext(RequestContext);

  function handleDateChange(date: Date) {
    dispatch({ type: "startDate", value: date });
    dispatch({ type: "appointmentTime", value: "" });
  }

  function maxDate() {
    if (!available) return;
    const maxDate = available[available.length - 1].date;
    return new Date(maxDate);
  }

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="datePicker">Select Date:</label>
      </div>
      <DatePicker
        autoComplete="off"
        name="datePicker"
        id="datePicker"
        placeholderText="Select Date"
        selected={state.startDate.value}
        highlightDates={populateHighlights(available)}
        minDate={new Date()}
        maxDate={maxDate()}
        onChange={(date: Date) => handleDateChange(date)}
        isClearable
        withPortal
        required
      />
      <FormErrorMessage message={"SELECT DATE"} name={"startDate"} />
    </section>
  );
}

export default SelectDate;
