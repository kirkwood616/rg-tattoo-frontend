import { RequestAction, RequestReducer } from "models/RequestReducer";
import { formatPhoneNumber, validateEmail, validatePhone } from "utils/Validation";

export const initialState: RequestReducer = {
  startDate: {
    value: null,
    hasErrors: true,
    checkCount: 0,
  },
  appointmentTime: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  firstName: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  lastName: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  age: {
    value: 18,
    hasErrors: false,
    checkCount: 0,
  },
  email: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  phoneNumber: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  tattooStyle: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  tattooPlacement: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  budget: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  referencePhoto: {
    value: null,
    hasErrors: true,
    checkCount: 0,
  },
  placementPhoto: {
    value: null,
    hasErrors: false,
    checkCount: 0,
  },
  tattooDescription: {
    value: "",
    hasErrors: true,
    checkCount: 0,
  },
  requestConfirm: {
    value: false,
    hasErrors: true,
    checkCount: 0,
  },
  hasErrors: false,
  submitCount: 0,
};

// ADD NEW CASES TO MODEL
export function requestReducer(state: RequestReducer, action: RequestAction) {
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
      if (state.startDate.checkCount > 0 && state.referencePhoto.value) {
        state.referencePhoto.value = null;
        state.referencePhoto.checkCount++;
        state.referencePhoto.hasErrors = true;
      }
      if (state.startDate.checkCount > 0 && state.placementPhoto.value) {
        state.placementPhoto.value = null;
        state.placementPhoto.checkCount++;
      }
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
      if (state.appointmentTime.value.length) {
        state.appointmentTime.hasErrors = false;
      } else {
        state.appointmentTime.hasErrors = true;
      }
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
      if (state.tattooStyle.value === "") {
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
    case "budget":
      state.budget.value = action.value;
      state.budget.checkCount++;
      if (state.budget.value === "") {
        state.budget.hasErrors = true;
      } else {
        state.budget.hasErrors = false;
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
    case "requestConfirm":
      state.requestConfirm.value = action.value;
      state.requestConfirm.checkCount++;
      if (!state.requestConfirm.value) {
        state.requestConfirm.hasErrors = true;
      } else {
        state.requestConfirm.hasErrors = false;
      }
      return;
    case "submitCount":
      state.submitCount++;
      return;
    case "submitErrorCheck":
      state.submitCount++;
      if (!state.startDate.value) {
        state.startDate.checkCount++;
        state.startDate.hasErrors = true;
      }
      if (!state.appointmentTime.value.length) {
        state.appointmentTime.checkCount++;
        state.appointmentTime.hasErrors = true;
      }
      if (!state.firstName.value.length) {
        state.firstName.checkCount++;
        state.firstName.hasErrors = true;
      }
      if (!state.lastName.value.length) {
        state.lastName.checkCount++;
        state.lastName.hasErrors = true;
      }
      if (state.age.value < 18) {
        state.age.checkCount++;
        state.age.hasErrors = true;
      }
      if (!state.email.value) {
        state.email.checkCount++;
        state.email.hasErrors = true;
      }
      if (!state.phoneNumber.value.length) {
        state.phoneNumber.checkCount++;
        state.phoneNumber.hasErrors = true;
      }
      if (!state.tattooStyle.value.length) {
        state.tattooStyle.checkCount++;
        state.tattooStyle.hasErrors = true;
      }
      if (!state.tattooPlacement.value.length) {
        state.tattooPlacement.checkCount++;
        state.tattooPlacement.hasErrors = true;
      }
      if (!state.budget.value.length) {
        state.budget.checkCount++;
        state.budget.hasErrors = true;
      }
      if (state.referencePhoto.value === null) {
        state.referencePhoto.checkCount++;
        state.referencePhoto.hasErrors = true;
      }
      if (!state.tattooDescription.value.length) {
        state.tattooDescription.checkCount++;
        state.tattooDescription.hasErrors = true;
      }
      if (!state.requestConfirm.value) {
        state.requestConfirm.checkCount++;
        state.requestConfirm.hasErrors = true;
      }
      return;
    case "dev":
      state.firstName.value = "Tommy";
      state.firstName.hasErrors = false;
      state.lastName.value = "Tester";
      state.lastName.hasErrors = false;
      state.age.value = 18;
      state.age.hasErrors = false;
      state.email.value = "tt@tt.io";
      state.email.hasErrors = false;
      state.phoneNumber.value = "(616) 555-5555";
      state.phoneNumber.hasErrors = false;
      state.tattooStyle.value = "Color";
      state.tattooStyle.hasErrors = false;
      state.tattooPlacement.value = "face";
      state.tattooPlacement.hasErrors = false;
      state.budget.value = "$80 - $120";
      state.budget.hasErrors = false;
      state.tattooDescription.value = "test \ntest \ntest test TEST";
      state.tattooDescription.hasErrors = false;
      state.requestConfirm.value = true;
      state.requestConfirm.hasErrors = false;
      return;
    default:
      return;
  }
}
