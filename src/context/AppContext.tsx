import { createContext } from "react";
import AvailableAppointments from "../models/AvailableAppointments";

interface ContextModel {
  availableAppointments: AvailableAppointments[];
  handleAvailableAppointments: () => void;
}

const defaultValue: ContextModel = {
  availableAppointments: [],
  handleAvailableAppointments: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
