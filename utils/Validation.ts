import { DispatchAction } from "models/DispatchAction";
import { RequestReducer } from "models/RequestReducer";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

// FIRST & LAST NAME
export function validateName(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>, dispatch: Dispatch<DispatchAction>, type: string) {
  setState(e.target.value);
  const delay = setTimeout(() => {
    if (e.target.value.length < 1) dispatch({ type: type, value: true });
    if (e.target.value.length >= 1) dispatch({ type: type, value: false });
  }, 800);
  return () => clearTimeout(delay);
}

// AGE
export function validateAge(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<number>>, dispatch: Dispatch<DispatchAction>) {
  setState(Number(e.target.value));
  const delay = setTimeout(() => {
    if (Number(e.target.value) < 18) dispatch({ type: "age", value: true });
    if (Number(e.target.value) >= 18) dispatch({ type: "age", value: false });
  }, 800);
  return () => clearTimeout(delay);
}

// EMAIL
export function validateEmail(email: string, state: RequestReducer) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  if (!email || regexp.test(email) === false) {
    state.email.hasErrors = true;
    return email;
  } else {
    state.email.hasErrors = false;
    return email;
  }
}

// PHONE # FORMATTER
export function formatPhoneNumber(value: string): string {
  if (!value) return value;
  const phoneNumberInput = value.replace(/[^\d]/g, "");
  const phoneNumberInputLength = phoneNumberInput.length;
  if (phoneNumberInputLength < 4) return phoneNumberInput;
  if (phoneNumberInputLength < 7) return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3)}`;
  return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3, 6)}-${phoneNumberInput.slice(6, 10)}`;
}

// PHONE #
export function validatePhone(value: string, state: RequestReducer): string {
  const formattedPhoneNumber = formatPhoneNumber(value);
  if (state.phoneNumber.value.length < 14) state.phoneNumber.hasErrors = true;
  if (state.phoneNumber.value.length === 14) state.phoneNumber.hasErrors = false;

  return formattedPhoneNumber;
}

// TATTOO PLACEMENT
export function validateTattooPlacement(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>, dispatch: Dispatch<DispatchAction>) {
  setState(e.target.value);
  const delay = setTimeout(() => {
    if (e.target.value.length <= 2) dispatch({ type: "tattooPlacement", value: true });
    if (e.target.value.length > 2) dispatch({ type: "tattooPlacement", value: false });
  }, 800);
  return () => clearTimeout(delay);
}

// TATTOO DESCRIPTION
export function validateTattooDescription(e: ChangeEvent<HTMLTextAreaElement>, setState: Dispatch<SetStateAction<string>>, dispatch: Dispatch<DispatchAction>) {
  setState(e.target.value);
  const delay = setTimeout(() => {
    if (e.target.value.length < 7) dispatch({ type: "tattooDescription", value: true });
    if (e.target.value.length >= 7) dispatch({ type: "tattooDescription", value: false });
  }, 800);
  return () => clearTimeout(delay);
}
