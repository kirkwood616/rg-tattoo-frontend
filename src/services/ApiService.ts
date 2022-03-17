import axios from "axios";
import AppointmentRequest from "../models/AppointmentRequest";

const apiLocalAppointmentRequests = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";

//// APPOINTMENT REQUESTS

// GET ALL
export function fetchAppointmentRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiLocalAppointmentRequests).then((res) => res.data);
}

// POST
export function postAppointmentRequest(request: AppointmentRequest): Promise<AppointmentRequest> {
  return axios.post<AppointmentRequest>(apiLocalAppointmentRequests, request).then((res) => res.data);
}
