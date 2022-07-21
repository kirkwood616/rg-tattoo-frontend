import { createContext } from "react";
import { AppointmentRequest } from "../models/AppointmentRequest";

interface AdminContextModel {
  appointmentRequests: AppointmentRequest[];
  newAppointmentRequests: AppointmentRequest[];
  rejectedRequests: AppointmentRequest[];
  handleAppointmentRequests: () => void;
}

const defaultValue: AdminContextModel = {
  appointmentRequests: [],
  newAppointmentRequests: [],
  rejectedRequests: [],
  handleAppointmentRequests: () => {},
};

const AdminContext = createContext(defaultValue);

export default AdminContext;
