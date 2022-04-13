import { formatPhoneNumber, validateEmail, validatePhone } from "../functions/Validation";
import { RequestReducer, RequestAction } from "../models/RequestReducer";

export const initialState: RequestReducer = {
  startDate: {
    value: undefined,
    hasErrors: false,
    checkCount: 0,
  },
  appointmentTime: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  firstName: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  lastName: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  age: {
    value: 18,
    hasErrors: false,
    checkCount: 0,
  },
  email: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  phoneNumber: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  tattooStyle: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  tattooPlacement: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  referencePhoto: {
    value: null,
    hasErrors: false,
    checkCount: 0,
  },
  placementPhoto: {
    value: null,
    hasErrors: false,
    checkCount: 0,
  },
  tattooDescription: {
    value: "",
    hasErrors: false,
    checkCount: 0,
  },
  ageConfirm: {
    value: false,
    hasErrors: false,
    checkCount: 0,
  },
  hasErrors: false,
};

// ADD NEW CASES TO MODEL
export function reducer(state: RequestReducer, action: RequestAction) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "hasErrors":
      if (action.value) {
        state.hasErrors = true;
      } else {
        state.hasErrors = false;
      }
      return;
    case "startDate":
      state.startDate.value = action.value;
      state.startDate.checkCount++;
      if (state.startDate.checkCount > 0 && !state.startDate.value) {
        state.startDate.hasErrors = true;
      } else {
        state.startDate.hasErrors = false;
      }
      return;
    case "appointmentTime":
      state.appointmentTime.value = action.value;
      state.appointmentTime.checkCount++;
      return;
    case "firstName":
      state.firstName.value = action.value;
      state.firstName.checkCount++;
      if (state.firstName.checkCount > 0 && state.firstName.value.length < 1) {
        state.firstName.hasErrors = true;
      } else {
        state.firstName.hasErrors = false;
      }
      return;
    case "lastName":
      state.lastName.value = action.value;
      state.lastName.checkCount++;
      if (state.lastName.checkCount > 0 && state.lastName.value.length < 1) {
        state.lastName.hasErrors = true;
      } else {
        state.lastName.hasErrors = false;
      }
      return;
    case "age":
      state.age.value = action.value;
      state.age.checkCount++;
      if (state.age.value < 18) {
        state.age.hasErrors = true;
      } else {
        state.age.hasErrors = false;
      }
      return;
    case "email":
      state.email.value = validateEmail(action.value, state);
      state.email.checkCount++;
      return;
    case "phoneNumber":
      state.phoneNumber.value = formatPhoneNumber(action.value);
      state.phoneNumber.checkCount++;
      validatePhone(state.phoneNumber.value, state);
      return;
    case "tattooStyle":
      state.tattooStyle.value = action.value;
      state.tattooStyle.checkCount++;
      if (state.tattooStyle.value === "select") {
        state.tattooStyle.hasErrors = true;
      } else {
        state.tattooStyle.hasErrors = false;
      }
      return;
    case "tattooPlacement":
      state.tattooPlacement.value = action.value;
      state.tattooPlacement.checkCount++;
      if (state.tattooPlacement.value.length <= 2) {
        state.tattooPlacement.hasErrors = true;
      } else {
        state.tattooPlacement.hasErrors = false;
      }
      return;
    case "referencePhoto":
      state.referencePhoto.value = action.value;
      state.referencePhoto.checkCount++;
      if (!state.referencePhoto.value) {
        state.referencePhoto.hasErrors = true;
      } else {
        state.referencePhoto.hasErrors = false;
      }
      return;
    case "placementPhoto":
      state.placementPhoto.value = action.value;
      state.placementPhoto.checkCount++;
      return;
    case "tattooDescription":
      state.tattooDescription.value = action.value;
      state.tattooDescription.checkCount++;
      if (state.tattooDescription.value.length < 7) {
        state.tattooDescription.hasErrors = true;
      } else {
        state.tattooDescription.hasErrors = false;
      }
      return;
    case "ageConfirm":
      state.ageConfirm.value = action.value;
      state.ageConfirm.checkCount++;
      return;
    default:
      return;
  }
}
