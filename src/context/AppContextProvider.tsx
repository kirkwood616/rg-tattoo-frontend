import { User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import AvailableAppointments from "../models/AvailableAppointments";
import { fetchAvailableAppointments } from "../services/ApiService";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  // STATES
  const [user, setUser] = useState<User | null>(null);
  const [availableAppointments, setAvailableAppointments] = useState<AvailableAppointments[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        availableAppointments,
        isLoading,
        setUser,
        handleAvailableAppointments,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
