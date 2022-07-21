import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";
import AvailableAppointments from "../models/AvailableAppointments";

interface ContextModel {
  user: User | null;
  availableAppointments: AvailableAppointments[];
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleAvailableAppointments: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextModel = {
  user: null,
  availableAppointments: [],
  isLoading: false,
  setUser: () => {},
  handleAvailableAppointments: () => {},
  setIsLoading: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
