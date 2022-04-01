import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";

import AvailableAppointments from "../models/AvailableAppointments";
import AppointmentRequest from "../models/AppointmentRequest";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";
import { fetchAppointmentRequests } from "../services/AdminApiService";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  // STATES
  const [user, setUser] = useState<User | null>(null);
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([]);
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);

  // APPOINTMENT REQUESTS
  function handleAppointmentRequests(): void {
    fetchAppointmentRequests().then((data) => setAppointmentRequests(data));
  }

  useEffect(() => {
    handleAppointmentRequests();
  }, []);

  // AVAILABLE APPOINTMENTS
  function handleAvailableAppointments(): void {
    fetchAvailableAppointments().then((data) => setAvailableAppointments(data));
  }

  useEffect(() => {
    handleAvailableAppointments();
  }, []);

  return (
    <AppContext.Provider value={{ user, appointmentRequests, availableAppointments, setUser, handleAppointmentRequests, handleAvailableAppointments }}>
      {children}
    </AppContext.Provider>
  );
}
