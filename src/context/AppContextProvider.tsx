import { ReactNode, useEffect, useState } from "react";
import AvailableAppointments from "../models/AvailableAppointments";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);

  function handleAvailableAppointments(): void {
    fetchAvailableAppointments().then((data) => setAvailableAppointments(data));
  }

  useEffect(() => {
    if (!availableAppointments.length) {
      handleAvailableAppointments();
    }
  }, [availableAppointments]);

  return <AppContext.Provider value={{ availableAppointments, handleAvailableAppointments }}>{children}</AppContext.Provider>;
}
