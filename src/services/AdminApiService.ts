import axios from "axios";
import AppointmentRequest from "../models/AppointmentRequest";
import AvailableAppointments from "../models/AvailableAppointments";

const apiRequestAppointment = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";
const apiAvailableAppointments = process.env.REACT_APP_API_AVAILABLE_ROUTE_LOCAL || "";

//// APPOINTMENT REQUESTS

// GET ALL
export function fetchAppointmentRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiRequestAppointment).then((res) => res.data);
}

//// AVAILABLE APPOINTMENTS

// POST
export function postAvailableAppointment(appointment: AvailableAppointments): Promise<AvailableAppointments> {
  return axios.post(apiAvailableAppointments, appointment).then((res) => res.data);
}

// PUT
export function updateAvailableAppointment(id: string, appointmentDateTimes: AvailableAppointments): Promise<AvailableAppointments> {
  return axios.put(`${apiAvailableAppointments}/${id}`, appointmentDateTimes).then((res) => res.data);
}
