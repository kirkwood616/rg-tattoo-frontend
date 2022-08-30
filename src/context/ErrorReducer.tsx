// import { Action, RequestErrors } from "../models/Errors";

// export const initialState: RequestErrors = {
//   startDateError: false,
//   appointmentTimeError: false,
//   firstNameError: false,
//   lastNameError: false,
//   ageError: false,
//   emailError: false,
//   phoneError: false,
//   tattooStyleError: false,
//   tattooPlacementError: false,
//   referenceImageError: false,
//   tattooDescriptionError: false,
//   requestConfirmError: false,
// };

// export function errorReducer(state: RequestErrors, action: Action) {
//   switch (action.type) {
//     case "startDate":
//       return { ...state, startDateError: action.value };
//     case "appointmentTime":
//       return { ...state, appointmentTimeError: action.value };
//     case "firstName":
//       return { ...state, firstNameError: action.value };
//     case "lastName":
//       return { ...state, lastNameError: action.value };
//     case "age":
//       return { ...state, ageError: action.value };
//     case "email":
//       return { ...state, emailError: action.value };
//     case "phone":
//       return { ...state, phoneError: action.value };
//     case "tattooStyle":
//       return { ...state, tattooStyleError: action.value };
//     case "tattooPlacement":
//       return { ...state, tattooPlacementError: action.value };
//     case "referenceImage":
//       return { ...state, referenceImageError: action.value };
//     case "tattooDescription":
//       return { ...state, tattooDescriptionError: action.value };
//     case "requestConfirm":
//       return { ...state, requestConfirmError: action.value };
//     default:
//       throw new Error();
//   }
// }
export {};
