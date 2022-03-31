import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import AvailableAppointments from "../models/AvailableAppointments";
import AppointmentRequest from "../models/AppointmentRequest";

interface ContextModel {
  user: User | null;
  appointmentRequests: AppointmentRequest[];
  availableAppointments: AvailableAppointments[];
  setUser: Dispatch<SetStateAction<User | null>>;
  handleAppointmentRequests: () => void;
  handleAvailableAppointments: () => void;
}

const defaultValue: ContextModel = {
  user: null,
  appointmentRequests: [],
  availableAppointments: [],
  setUser: () => {},
  handleAppointmentRequests: () => {},
  handleAvailableAppointments: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
