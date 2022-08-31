import { AppointmentRequest } from "models/AppointmentRequest";

export default function actionSubmitRequest(request: AppointmentRequest, note: string, deposit: number, priceCharged: number): AppointmentRequest {
  let updatedRequest: AppointmentRequest = request;
  switch (request.requestStatus) {
    case "new":
      if (note.length) {
        updatedRequest = {
          ...request,
          requestStatus: "awaiting-deposit",
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Request Approved. Awaiting Deposit.", note: note }],
        };
      } else {
        updatedRequest = {
          ...request,
          requestStatus: "awaiting-deposit",
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Request Approved. Awaiting Deposit." }],
        };
      }
      break;
    case "awaiting-deposit":
      if (note.length) {
        updatedRequest = {
          ...request,
          requestStatus: "deposit-received",
          depositAmmountReceived: deposit,
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Deposit Received. Appointment Scheduled.", note: note }],
        };
      } else {
        updatedRequest = {
          ...request,
          requestStatus: "deposit-received",
          depositAmmountReceived: deposit,
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Deposit Received. Appointment Scheduled." }],
        };
      }
      break;
    case "deposit-received":
      if (note.length) {
        updatedRequest = {
          ...request,
          requestStatus: "completed",
          isRequestClosed: true,
          priceCharged: priceCharged,
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Completed.", note: note }],
        };
      } else {
        updatedRequest = {
          ...request,
          requestStatus: "completed",
          isRequestClosed: true,
          priceCharged: priceCharged,
          historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Completed." }],
        };
      }
      break;
  }
  return updatedRequest;
}
