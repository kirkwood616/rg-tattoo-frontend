interface AppointmentRequest {
  _id?: string;
  requestSubmittedDate: Date;
  requestDateTime: Date;
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
  isRequestApproved: Boolean;
  isRequestDenied: Boolean;
  deniedMessage?: string;
}

export default AppointmentRequest;
