import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";
import AvailableAppointments from "../models/AvailableAppointments";
import AppointmentRequest from "../models/AppointmentRequest";

interface ContextModel {
  user: User | null;
  appointmentRequests: AppointmentRequest[];
  newAppointmentRequests: AppointmentRequest[];
  rejectedRequests: AppointmentRequest[];
  availableAppointments: AvailableAppointments[];
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleAppointmentRequests: () => void;
  handleAvailableAppointments: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextModel = {
  user: null,
  appointmentRequests: [],
  newAppointmentRequests: [],
  rejectedRequests: [],
  availableAppointments: [],
  isLoading: false,
  setUser: () => {},
  handleAppointmentRequests: () => {},
  handleAvailableAppointments: () => {},
  setIsLoading: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
