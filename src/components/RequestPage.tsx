import RequestContextProvider from "context/RequestContextProvider";
import RequestAppointment from "pages/RequestAppointment";

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
