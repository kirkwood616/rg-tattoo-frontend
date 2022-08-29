import { ReactNode, useEffect, useState } from "react";
import { AppointmentRequest } from "../models/AppointmentRequest";
import { fetchAppointmentRequests } from "../services/AdminApiService";
import AdminContext from "./AdminContext";

interface Props {
  children: ReactNode;
}

export default function AdminContextProvider({ children }: Props) {
  // STATES
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [newAppointmentRequests, setNewAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [deniedRequests, setDeniedRequests] = useState<AppointmentRequest[]>([]);

  // APPOINTMENT REQUESTS
  function handleAppointmentRequests(): void {
    fetchAppointmentRequests().then((data) => setAppointmentRequests(data));
  }

  // useEffect(() => {
  //   handleAppointmentRequests();
  // }, []);

  // NEW APPOINTMENT REQUESTS
  useEffect(() => {
    const newRequests: AppointmentRequest[] | undefined = appointmentRequests.filter((request) => {
      return request.requestStatus === "new";
    });
    if (newRequests.length > 0) {
      setNewAppointmentRequests(newRequests);
    } else {
      return;
    }
  }, [appointmentRequests]);

  // DENIED REQUESTS
  // useEffect(() => {
  //   fetchDeniedRequests().then((data) => setDeniedRequests(data));
  // }, []);

  return (
    <AdminContext.Provider
      value={{
        appointmentRequests,
        newAppointmentRequests,
        deniedRequests,
        handleAppointmentRequests,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}