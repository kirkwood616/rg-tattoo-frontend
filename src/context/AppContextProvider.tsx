import { ReactNode, useEffect, useState } from "react";
import AvailableAppointments from "../models/AvailableAppointments";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);

  useEffect(() => {
    if (!availableAppointments.length) {
      fetchAvailableAppointments().then((data) => setAvailableAppointments(data));
    }
  }, [availableAppointments]);

  return <AppContext.Provider value={{ availableAppointments }}>{children}</AppContext.Provider>;
}
