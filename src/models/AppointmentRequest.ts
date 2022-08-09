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
  referencePhotoPath: string;
  placementPhotoPath: string;
  tattooDescription: string;
  requestConfirm: boolean;
  // requestStatus: RequestStatus;
  isRequestApproved: boolean; // remove?
  isDepositReceived: boolean;
  // depositAmmountReceived: number;
  isRequestDenied: boolean; // remove?
  deniedMessage?: string;
  isRequestCanceled: boolean; // remove?
  isCompleted: boolean; // remove?
  isRequestClosed: boolean;
  priceCharged: number;
  notes: Note[];
}

export type RequestStatus = "new" | "awaiting-deposit" | "deposit-received" | "completed" | "canceled" | "denied";

export interface Note {
  dateCreated: string;
  note: string;
}
