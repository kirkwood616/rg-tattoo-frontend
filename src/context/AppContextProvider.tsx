import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";

import AvailableAppointments from "../models/AvailableAppointments";
import AppointmentRequest from "../models/AppointmentRequest";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";
import { fetchAppointmentRequests, fetchRejectedRequests } from "../services/AdminApiService";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  // STATES
  const [user, setUser] = useState<User | null>(null);
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [newAppointmentRequests, setNewAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<AppointmentRequest[]>([]);
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      return request.isRequestApproved === false && request.isRequestDenied === false;
    });
    if (newRequests.length > 0) {
      setNewAppointmentRequests(newRequests);
    } else {
      return;
    }
  }, [appointmentRequests]);

  // REJECTED REQUESTS
  useEffect(() => {
    fetchRejectedRequests().then((data) => setRejectedRequests(data));
  }, []);

  // AVAILABLE APPOINTMENTS
  function handleAvailableAppointments(): void {
    fetchAvailableAppointments().then((data) => setAvailableAppointments(data));
  }

  useEffect(() => {
    handleAvailableAppointments();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        appointmentRequests,
        newAppointmentRequests,
        rejectedRequests,
        availableAppointments,
        isLoading,
        setUser,
        handleAppointmentRequests,
        handleAvailableAppointments,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
