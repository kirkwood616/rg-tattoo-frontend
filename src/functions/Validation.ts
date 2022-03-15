import { ChangeEvent, Dispatch, SetStateAction } from "react";

// FIRST & LAST NAME
export function validateName(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>, setError: Dispatch<SetStateAction<boolean>>) {
  setState(e.target.value);
  if (e.target.value.length < 1) setError(true);
  if (e.target.value.length >= 1) setError(false);
}

// AGE
export function validateAge(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<number>>, setError: Dispatch<SetStateAction<boolean>>) {
  setState(Number(e.target.value));
  if (Number(e.target.value) < 18) setError(true);
  if (Number(e.target.value) >= 18) setError(false);
}

// EMAIL
export function validateEmail(email: string, setError: Dispatch<SetStateAction<boolean>>): boolean {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  if (!email || regexp.test(email) === false) {
    setError(true);
    return false;
  } else {
    setError(false);
    return true;
  }
}

// PHONE # FORMATTER
export function formatPhoneNumber(value: string) {
  if (!value) return value;
  const phoneNumberInput = value.replace(/[^\d]/g, "");
  const phoneNumberInputLength = phoneNumberInput.length;
  if (phoneNumberInputLength < 4) return phoneNumberInput;
  if (phoneNumberInputLength < 7) return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3)}`;
  return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3, 6)}-${phoneNumberInput.slice(6, 10)}`;
}

// PHONE #
export function validatePhone(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>) {
  const formattedPhoneNumber = formatPhoneNumber(e.target.value);
  setState(formattedPhoneNumber);
}

// TATTOO PLACEMENT
export function validateTattooPlacement(e: ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<string>>, setError: Dispatch<SetStateAction<boolean>>) {
  setState(e.target.value);
  if (e.target.value.length <= 2) setError(true);
  if (e.target.value.length > 2) setError(false);
}

// TATTOO DESCRIPTION
export function validateTattooDescription(e: ChangeEvent<HTMLTextAreaElement>, setState: Dispatch<SetStateAction<string>>, setError: Dispatch<SetStateAction<boolean>>) {
  setState(e.target.value);
  if (e.target.value.length < 7) setError(true);
  if (e.target.value.length >= 7) setError(false);
}
