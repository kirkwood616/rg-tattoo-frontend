import { AppointmentRequest } from "models/AppointmentRequest";

export default function actionSubmitRequest(
  request: AppointmentRequest,
  depositAmmountRequired: number,
  depositReceived: number,
  ammountCharged: number
): AppointmentRequest {
  let updatedRequest: AppointmentRequest = { ...request };
  switch (request.requestStatus) {
    case "new":
      updatedRequest = {
        ...request,
        requestStatus: "awaiting-deposit",
        depositRequired: depositAmmountRequired,
        historyLog: [
          ...request.historyLog,
          {
            dateCreated: new Date(),
            action: "Request Approved. Awaiting Deposit.",
            note: `$${depositAmmountRequired} deposit required.`,
          },
        ],
      };
      break;
    case "awaiting-deposit":
      updatedRequest = {
        ...request,
        requestStatus: "deposit-received",
        depositAmmountReceived: depositReceived,
        historyLog: [
          ...request.historyLog,
          {
            dateCreated: new Date(),
            action: "Deposit Received. Appointment Scheduled.",
            note: `$${depositReceived} deposit required.`,
          },
        ],
      };
      break;
    case "deposit-received":
      updatedRequest = {
        ...request,
        requestStatus: "completed",
        priceCharged: ammountCharged,
        historyLog: [
          ...request.historyLog,
          { dateCreated: new Date(), action: "Appointment Completed.", note: `$${ammountCharged} payment received.` },
        ],
      };
      break;
  }
  return updatedRequest;
}
