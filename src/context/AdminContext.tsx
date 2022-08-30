import { createContext } from "react";

interface AdminContextModel {
  // appointmentRequests: AppointmentRequest[];
  // newAppointmentRequests: AppointmentRequest[];
  // deniedRequests: AppointmentRequest[];
  // handleAppointmentRequests: () => void;
}

const defaultValue: AdminContextModel = {
  // appointmentRequests: [],
  // newAppointmentRequests: [],
  // deniedRequests: [],
  // handleAppointmentRequests: () => {},
};

const AdminContext = createContext(defaultValue);

export default AdminContext;
