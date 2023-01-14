import RequestAppointment from "components/page/RequestAppointment";
import RequestContextProvider from "context/RequestContextProvider";

export default function RequestAppointmentPage() {
  return (
    <RequestContextProvider>
      <RequestAppointment />
    </RequestContextProvider>
  );
}
