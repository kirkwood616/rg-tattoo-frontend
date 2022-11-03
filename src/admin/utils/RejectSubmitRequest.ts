import { AppointmentRequest, HistoryAction, RejectType } from "models/AppointmentRequest";

export function rejectSubmitRequest(
  request: AppointmentRequest,
  rejectType: RejectType,
  deniedReason: string,
  canceledReason: string
) {
  function rejectAction(): HistoryAction {
    if (rejectType === "denied") return "Request Denied.";
    else return "Appointment Canceled.";
  }

  function rejectReason(): string {
    if (deniedReason.length) return deniedReason;
    if (canceledReason.length) return canceledReason;
    else return "Appointment Request Denied";
  }

  let rejectedRequest: AppointmentRequest = {
    ...request,
    requestStatus: rejectType,
    historyLog: [
      ...request.historyLog,
      {
        dateCreated: new Date(),
        action: rejectAction(),
        note: rejectReason(),
      },
    ],
  };
  return rejectedRequest;
}
