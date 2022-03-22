import axios from "axios";
import AvailableAppointments from "../models/AvailableAppointments";

// const apiRequestAppointment = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";
const apiAvailableAppointments = process.env.REACT_APP_API_AVAILABLE_ROUTE_LOCAL || "";

//// AVAILABLE APPOINTMENTS
// POST
export function postAvailableAppointment(appointment: AvailableAppointments): Promise<AvailableAppointments> {
  return axios.post(apiAvailableAppointments, appointment).then((res) => res.data);
}
