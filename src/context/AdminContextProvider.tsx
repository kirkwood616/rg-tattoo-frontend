import { ReactNode } from "react";
import AdminContext from "./AdminContext";

interface Props {
  children: ReactNode;
}

export default function AdminContextProvider({ children }: Props) {
  // STATE
  // const [appointmentRequests] = useState<AppointmentRequest[]>([]);
  // const [newAppointmentRequests] = useState<AppointmentRequest[]>([]);
  // const [deniedRequests] = useState<AppointmentRequest[]>([]);

  // APPOINTMENT REQUESTS
  // function handleAppointmentRequests(): void {
  //   fetchAppointmentRequests().then((data) => setAppointmentRequests(data));
  // }

  // useEffect(() => {
  //   handleAppointmentRequests();
  // }, []);

  // NEW APPOINTMENT REQUESTS
  // useEffect(() => {
  //   const newRequests: AppointmentRequest[] | undefined = appointmentRequests.filter((request) => {
  //     return request.requestStatus === "new";
  //   });
  //   if (newRequests.length > 0) {
  //     setNewAppointmentRequests(newRequests);
  //   } else {
  //     return;
  //   }
  // }, [appointmentRequests]);

  // DENIED REQUESTS
  // useEffect(() => {
  //   fetchDeniedRequests().then((data) => setDeniedRequests(data));
  // }, []);

  return (
    <AdminContext.Provider
      value={
        {
          // appointmentRequests,
          // newAppointmentRequests,
          // deniedRequests,
          // handleAppointmentRequests,
        }
      }
    >
      {children}
    </AdminContext.Provider>
  );
}
