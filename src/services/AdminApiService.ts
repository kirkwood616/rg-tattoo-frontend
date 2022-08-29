import axios from "axios";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";
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
export async function denyAppointmentRequest(request: AppointmentRequest): Promise<AvailableAppointments> {
  const res = await axios.put(`${apiRequestAppointment}/denied/${request._id}`, request);
  return res.data;
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
export async function getRequests(url: string): Promise<AppointmentRequest[] | void> {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.get(`${apiBaseRoute}/${url}`, { headers: { token } });
  return res.data;
}

export async function getRequest(url: string): Promise<AppointmentRequest | void> {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.get(`${apiBaseRoute}/${url}`, { headers: { token } });
  return res.data;
}

export async function approveNewRequest(request: AppointmentRequest) {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/new/approve/${request._id}`, request, { headers: { token } });
  return res.data;
}

export async function sendDepositReceivedRequest(request: AppointmentRequest) {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/awaiting-deposit/received/${request._id}`, request, { headers: { token } });
  return res.data;
}

export async function sendCompletedRequest(request: AppointmentRequest) {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/deposit-received/completed/${request._id}`, request, { headers: { token } });
  return res.data;
}

export async function sendCanceledRequest(request: AppointmentRequest) {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.put(`${apiBaseRoute}/appointment-requests/cancel-request/${request._id}`, request, { headers: { token } });
  return res.data;
}

export async function putClosedRequest(request: AppointmentRequest) {
  const token = await auth.currentUser?.getIdToken(true);
  if (!token) return;
  const res = await axios.put(`${apiBaseRoute}/archive/update/${request._id}`, request, { headers: { token } });
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
