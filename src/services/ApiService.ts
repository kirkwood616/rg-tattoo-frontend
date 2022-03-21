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

// POST
export function postAppointmentRequest(request: AppointmentRequest): Promise<AppointmentRequest> {
  return axios.post<AppointmentRequest>(apiRequestAppointment, request).then((res) => res.data);
}

//// AVAILABLE APPOINTMENTS

// GET ALL
export function fetchAvailableAppointments(): Promise<AvailableAppointments[]> {
  return axios.get(apiAvailableAppointments).then((res) => res.data);
}
