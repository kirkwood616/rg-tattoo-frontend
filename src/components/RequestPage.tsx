import RequestContextProvider from "../context/RequestContextProvider";
import RequestAppointment from "./RequestAppointment";

function RequestPage() {
  return (
    <>
      <RequestContextProvider>
        <RequestAppointment />
      </RequestContextProvider>
    </>
  );
}

export default RequestPage;
