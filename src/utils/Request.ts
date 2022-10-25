import { format } from "date-fns";
import { AppointmentRequest } from "models/AppointmentRequest";
import { RequestReducer } from "models/RequestReducer";
import { formatPhotoPath } from "./Formatting";

export function generateNewRequest(state: RequestReducer): AppointmentRequest {
  const newRequest: AppointmentRequest = {
    requestSubmittedDate: new Date(),
    requestDate: format(state.startDate.value!, "MM/dd/yyyy"),
    // requestDate: dateEstUS(state.startDate.value!),
    // requestDate: format(state.startDate.value!, "MM-dd-yyyy"),
    requestTime: state.appointmentTime.value,
    firstName: state.firstName.value,
    lastName: state.lastName.value,
    age: state.age.value,
    email: state.email.value.toLowerCase(),
    phoneNumber: state.phoneNumber.value,
    tattooStyle: state.tattooStyle.value,
    tattooPlacement: state.tattooPlacement.value,
    budget: state.budget.value,
    referencePhotoPath: formatPhotoPath(state, "reference"),
    placementPhotoPath: formatPhotoPath(state, "placement"),
    tattooDescription: state.tattooDescription.value,
    requestConfirm: state.requestConfirm.value,
    requestStatus: "new",
    depositRequired: 0,
    depositAmmountReceived: 0,
    isRequestClosed: false,
    priceCharged: 0,
    historyLog: [
      {
        dateCreated: new Date(),
        action: "New Appointment Request Submitted.",
      },
    ],
  };
  return newRequest;
}
