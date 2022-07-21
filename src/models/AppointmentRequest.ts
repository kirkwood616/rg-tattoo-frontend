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
  isRequestApproved: boolean;
  isDepositReceived: boolean;
  isRequestDenied: boolean;
  deniedMessage?: string;
  isRequestCanceled: boolean;
  isCompleted: boolean;
  isRequestClosed: boolean;
  priceCharged: number;
  notes: Note[];
}

export interface Note {
  dateCreated: string;
  note: string;
}
