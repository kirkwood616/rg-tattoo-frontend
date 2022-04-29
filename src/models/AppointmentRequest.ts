interface AppointmentRequest {
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
  isRequestDenied: boolean;
  deniedMessage?: string;
}

export default AppointmentRequest;
