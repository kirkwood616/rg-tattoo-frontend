import axios from "axios";
import { AppointmentRequest } from "models/AppointmentRequest";
import AvailableAppointments from "models/AvailableAppointments";

const apiAvailableAppointments = process.env.REACT_APP_API_AVAILABLE_ROUTE_LOCAL || "";
const apiBaseRoute = process.env.REACT_APP_API_BASE_ROUTE || "";

export async function postAppointmentRequest(request: AppointmentRequest): Promise<AppointmentRequest> {
  const res = await axios.post<AppointmentRequest>(`${apiAvailableAppointments}/new-request`, request);
  return res.data;
}

export async function getAvailableAppointments(url: string): Promise<AvailableAppointments[]> {
  const res = await axios.get(`${apiBaseRoute}/${url}`);
  return res.data;
}
