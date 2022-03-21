import { createContext } from "react";
import AvailableAppointments from "../models/AvailableAppointments";

interface ContextModel {
  availableAppointments: AvailableAppointments[];
}

const defaultValue: ContextModel = {
  availableAppointments: [],
};

const AppContext = createContext(defaultValue);

export default AppContext;
