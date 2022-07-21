import { ReactNode, useEffect, useState } from "react";
import { AppointmentRequest } from "../models/AppointmentRequest";
import { fetchAppointmentRequests, fetchRejectedRequests } from "../services/AdminApiService";
import AdminContext from "./AdminContext";

interface Props {
  children: ReactNode;
}

export default function AdminContextProvider({ children }: Props) {
  // STATES
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [newAppointmentRequests, setNewAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<AppointmentRequest[]>([]);

  // APPOINTMENT REQUESTS
  function handleAppointmentRequests(): void {
    fetchAppointmentRequests().then((data) => setAppointmentRequests(data));
  }

  useEffect(() => {
    handleAppointmentRequests();
  }, []);

  // NEW APPOINTMENT REQUESTS
  useEffect(() => {
    const newRequests: AppointmentRequest[] | undefined = appointmentRequests.filter((request) => {
      return !request.isRequestApproved && !request.isRequestDenied && !request.isDepositReceived && !request.isCompleted && !request.isRequestClosed;
    });
    if (newRequests.length > 0) {
      setNewAppointmentRequests(newRequests);
    } else {
      return;
    }
  }, [appointmentRequests]);
  console.log(newAppointmentRequests);

  // REJECTED REQUESTS
  useEffect(() => {
    fetchRejectedRequests().then((data) => setRejectedRequests(data));
  }, []);

  return (
    <AdminContext.Provider
      value={{
        appointmentRequests,
        newAppointmentRequests,
        rejectedRequests,
        handleAppointmentRequests,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
