import axios from "axios";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { storage } from "firebaseConfig";
import { AppointmentRequest } from "models/AppointmentRequest";
import AvailableAppointments from "models/AvailableAppointments";
import admin from "./AdminInterceptor";

const apiRequestAppointment = process.env.REACT_APP_API_REQUEST_ROUTE_LOCAL || "";
const apiDeniedAppointments = process.env.REACT_APP_API_DENIED_ROUTE_LOCAL || "";

//// 1. APPOINTMENT REQUESTS
// GET ALL REQUESTS
export function fetchAppointmentRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiRequestAppointment).then((res) => res.data);
}

// PUT
export function updateAppointmentRequest(
  id: string,
  appointmentRequest: AppointmentRequest
): Promise<AvailableAppointments> {
  return axios.put(`${apiRequestAppointment}/${id}`, appointmentRequest).then((res) => res.data);
}

// REJECT
export async function denyAppointmentRequest(request: AppointmentRequest): Promise<AvailableAppointments> {
  const res = await axios.put(`${apiRequestAppointment}/denied/${request._id}`, request);
  return res.data;
}

// GET ALL REJECTED REQUESTS
export function fetchDeniedRequests(): Promise<AppointmentRequest[]> {
  return axios.get(apiDeniedAppointments).then((res) => res.data);
}

// SWR

//// 1. AVAILABLE APPOINTMENTS
// POST
export async function postAvailableAppointment(appointment: AvailableAppointments): Promise<AvailableAppointments> {
  const res = await admin.post("/available-appointments/create", appointment);
  return res.data;
}

// PUT
export async function updateAvailableAppointment(
  id: string,
  appointmentDateTimes: AvailableAppointments
): Promise<AvailableAppointments> {
  const res = await admin.put(`/available-appointments/update/${id}`, appointmentDateTimes);
  return res.data;
}

//// 2. APPOINTMENT REQUESTS
export async function getRequests(url: string): Promise<AppointmentRequest[] | void> {
  const res = await admin.get(url);
  return res.data;
}

export async function getRequest(url: string): Promise<AppointmentRequest | void> {
  const res = await admin.get(url);
  return res.data;
}

export async function sendApprovedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/new/approve/${request._id}`, request);
  return res.data;
}

// HERE
export async function sendDeniedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/deny-request/${request._id}`, request);
  return res.data;
}

export async function sendDepositReceivedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/awaiting-deposit/received/${request._id}`, request);
  return res.data;
}

export async function sendCompletedRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/deposit-received/completed/${request._id}`, request);
  return res.data;
}

export async function sendCanceledRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/cancel-request/${request._id}`, request);
  return res.data;
}

// HERE
export async function updateOpenRequest(request: AppointmentRequest) {
  const res = await admin.put(`appointment-requests/update/${request._id}`, request);
  return res.data;
}

export async function updateClosedRequest(request: AppointmentRequest) {
  const res = await admin.put(`archive/update/${request._id}`, request);
  return res.data;
}

export async function fetchPhotoUrls(request: AppointmentRequest) {
  const referencePhotoRef: StorageReference = ref(storage, `images/${request.referencePhotoPath}`);
  const placementPhotoRef: StorageReference = ref(storage, `images/${request.placementPhotoPath}`);

  try {
    if (request.placementPhotoPath.length) {
      const referencePhotoURL = await getDownloadURL(referencePhotoRef);
      const placementPhotoURL = await getDownloadURL(placementPhotoRef);
      return { referencePhotoURL, placementPhotoURL };
    } else {
      const referencePhotoURL = await getDownloadURL(referencePhotoRef);
      const placementPhotoURL = undefined;
      return { referencePhotoURL, placementPhotoURL };
    }
  } catch (error) {
    console.error(error);
  }
}
