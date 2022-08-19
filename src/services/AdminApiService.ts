import axios from "axios";
import { AppointmentRequest } from "../models/AppointmentRequest";
import AvailableAppointments from "../models/AvailableAppointments";

const apiRequestAppointment = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";
const apiAvailableAppointments = process.env.REACT_APP_API_AVAILABLE_ROUTE_LOCAL || "";
const apiDeniedAppointments = process.env.REACT_APP_API_DENIED_ROUTE_LOCAL || "";
const apiBaseRoute = process.env.REACT_APP_API_BASE_ROUTE || "";

//// 1. APPOINTMENT REQUESTS
// GET ALL REQUESTS
export function fetchAppointmentRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiRequestAppointment).then((res) => res.data);
}

// PUT
export function updateAppointmentRequest(id: string, appointmentRequest: AppointmentRequest): Promise<AvailableAppointments> {
  return axios.put(`${apiRequestAppointment}/${id}`, appointmentRequest).then((res) => res.data);
}

// REJECT
export function denyAppointmentRequest(id: string, appointmentRequest: AppointmentRequest): Promise<AvailableAppointments> {
  return axios.put(`${apiRequestAppointment}/denied/${id}`, appointmentRequest).then((res) => res.data);
}

// GET ALL REJECTED REQUESTS
export function fetchDeniedRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiDeniedAppointments).then((res) => res.data);
}

//// 2. AVAILABLE APPOINTMENTS
// POST
export function postAvailableAppointment(appointment: AvailableAppointments): Promise<AvailableAppointments> {
  return axios.post(apiAvailableAppointments, appointment).then((res) => res.data);
}

// PUT
export function updateAvailableAppointment(id: string, appointmentDateTimes: AvailableAppointments): Promise<AvailableAppointments> {
  return axios.put(`${apiAvailableAppointments}/${id}`, appointmentDateTimes).then((res) => res.data);
}

// SWR
export async function getRequests(url: string): Promise<AppointmentRequest[]> {
  const res = await axios.get(`${apiBaseRoute}/${url}`);
  return res.data;
}

export async function getRequest(url: string): Promise<AppointmentRequest> {
  const res = await axios.get(`${apiBaseRoute}/${url}`);
  return res.data;
}

export async function approveNewRequest(id: string, request: AppointmentRequest) {
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/new/approve/${id}`, request);
  return res.data;
}

export async function depositReceivedRequest(id: string, request: AppointmentRequest) {
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/awaiting-deposit/received/${id}`, request);
  return res.data;
}
