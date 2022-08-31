import { approveNewRequest, sendCompletedRequest, sendDepositReceivedRequest } from "admin/services/AdminApiService";
import { AppointmentRequest } from "models/AppointmentRequest";

// Request is updated to it's next status from actionSubmitRequest()
// Use next status in chain (e.g. "new" === "awaiting-deposit")
export default function requestApiCall(updatedRequest: AppointmentRequest) {
  switch (updatedRequest.requestStatus) {
    case "awaiting-deposit":
      return approveNewRequest(updatedRequest);
    case "deposit-received":
      return sendDepositReceivedRequest(updatedRequest);
    case "completed":
      return sendCompletedRequest(updatedRequest);
  }
}
