import axios from "axios";
import { AppointmentRequest } from "models/AppointmentRequest";
import AvailableAppointments from "models/AvailableAppointments";

const apiRequestAppointment = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";
const apiAvailableAppointments = process.env.REACT_APP_API_AVAILABLE_ROUTE_LOCAL || "";
const apiBaseRoute = process.env.REACT_APP_API_BASE_ROUTE || "";

// POST
export async function postAppointmentRequest(request: AppointmentRequest): Promise<AppointmentRequest> {
  const res = await axios.post<AppointmentRequest>(apiRequestAppointment, request);
  return res.data;
}

//// AVAILABLE APPOINTMENTS

// GET ALL
export async function fetchAvailableAppointments(): Promise<AvailableAppointments[]> {
  const res = await axios.get(apiAvailableAppointments);
  return res.data;
}

// NEW SWR
export async function getAvailableAppointments(url: string): Promise<AvailableAppointments[]> {
  const res = await axios.get(`${apiBaseRoute}/${url}`);
  return res.data;
}
