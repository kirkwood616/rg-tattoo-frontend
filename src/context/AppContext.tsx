import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import AvailableAppointments from "../models/AvailableAppointments";
import AppointmentRequest from "../models/AppointmentRequest";

interface ContextModel {
  appointmentRequests: AppointmentRequest[];
  availableAppointments: AvailableAppointments[];
  handleAvailableAppointments: () => void;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue: ContextModel = {
  appointmentRequests: [],
  availableAppointments: [],
  handleAvailableAppointments: () => {},
  user: null,
  setUser: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
