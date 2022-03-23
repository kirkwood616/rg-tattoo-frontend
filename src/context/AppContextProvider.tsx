import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";

import AvailableAppointments from "../models/AvailableAppointments";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);
  const [user, setUser] = useState<User | null>(null);

  function handleAvailableAppointments(): void {
    fetchAvailableAppointments().then((data) => setAvailableAppointments(data));
  }

  useEffect(() => {
    if (!availableAppointments.length) {
      handleAvailableAppointments();
    }
  }, [availableAppointments]);

  return <AppContext.Provider value={{ availableAppointments, handleAvailableAppointments, user, setUser }}>{children}</AppContext.Provider>;
}
