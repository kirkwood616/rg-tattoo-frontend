export interface AppointmentRequest {
  _id?: string;
  requestSubmittedDate: Date;
  requestDate: string;
  requestTime: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  tattooStyle: string;
  tattooPlacement: string;
  budget: string;
  referencePhotoPath: string;
  placementPhotoPath: string;
  tattooDescription: string;
  requestConfirm: boolean;
  requestStatus: RequestStatus;
  depositRequired: number;
  depositAmmountReceived: number;
  deniedMessage?: string;
  isRequestClosed: boolean;
  priceCharged: number;
  refundAmmount?: number;
  historyLog: HistoryLogItem[];
}

export type RequestStatus = "new" | "awaiting-deposit" | "deposit-received" | "completed" | "canceled" | "denied";

export interface HistoryLogItem {
  dateCreated: Date;
  action?: HistoryAction;
  note?: string;
}

export type HistoryAction =
  | "New Appointment Request Submitted."
  | "Request Approved. Awaiting Deposit."
  | "Deposit Received. Appointment Scheduled."
  | "Appointment Completed."
  | "Appointment Canceled."
  | "Request Denied.";

export type PhotoType = "reference" | "placement";
