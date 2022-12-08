import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { subDays } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { ReactNode, useContext, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";

interface Props {
  available: AvailableAppointments[] | undefined;
}

function CalendarLegend(props: { children: ReactNode }) {
  return (
    <>
      <CalendarContainer>
        <>X = Available Date</>
        <div>{props.children}</div>
      </CalendarContainer>
    </>
  );
}

function SelectDate({ available }: Props) {
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

  function populateAvailableHighlights() {
    if (!available) return;
    let highlightDates: Date[] = [];
    available.forEach((item) => {
      if (item.availableTimes.length) {
        highlightDates.push(subDays(new Date(item.date), 0));
      }
    });
    return highlightDates;
  }

  const highlights = populateAvailableHighlights();

  return (
    <section className="field_container">
      <label htmlFor="datePicker">Select Date:</label>
      <DatePicker
        name="datePicker"
        id="datePicker"
        placeholderText="Select Date"
        onChange={handleDateChange}
        minDate={new Date()}
        maxDate={maxAppointmentDate}
        filterDate={disabledDates}
        excludeDates={excludedDates}
        highlightDates={highlights}
        autoComplete="off"
        isClearable
        withPortal
        required
      />
      <FormErrorMessage message={"SELECT DATE"} name={"startDate"} />
    </section>
  );
}

export default SelectDate;
