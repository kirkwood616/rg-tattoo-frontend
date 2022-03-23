import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import AvailableAppointments from "../models/AvailableAppointments";

interface ContextModel {
  availableAppointments: AvailableAppointments[];
  handleAvailableAppointments: () => void;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue: ContextModel = {
  availableAppointments: [],
  handleAvailableAppointments: () => {},
  user: null,
  setUser: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
