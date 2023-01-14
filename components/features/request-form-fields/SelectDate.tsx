import FormError from "components/ui/errors/FormError";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import AvailableAppointments from "models/AvailableAppointments";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import { populateHighlights } from "utils/DatePicker";

interface SelectDateProps {
  available: AvailableAppointments[] | undefined;
}

export default function SelectDate({ available }: SelectDateProps) {
  const { state, dispatch } = useContext(RequestContext);

  function handleDateChange(date: Date) {
    dispatch({ type: "startDate", value: date });
    if (state.appointmentTime.value) dispatch({ type: "appointmentTime", value: "" });
  }

  function maxDate() {
    if (!available) return;
    const maxDate = available[available.length - 1]?.date;
    return maxDate ? new Date(maxDate) : new Date();
  }

  return (
    <Form.Field>
      <Form.Label labelID="selectDate" />
      <DatePicker
        autoComplete="off"
        name="selectDate"
        id="selectDate"
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
      {state.startDate.hasErrors && state.startDate.checkCount > 0 && (
        <FormError errorMessage={"SELECT DATE"} name={"startDate"} />
      )}
    </Form.Field>
  );
}
