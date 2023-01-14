export interface FieldValues {
  value: Date | undefined | string | boolean | number | File | null;
  hasErrors: boolean;
  checkCount: number;
}

export interface ReducerModel {
  [key: string]: FieldValues | boolean | number;
}

export interface RequestReducer extends ReducerModel {
  startDate: {
    value: Date | null;
    hasErrors: boolean;
    checkCount: number;
  };
  appointmentTime: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  firstName: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  lastName: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  age: {
    value: number;
    hasErrors: boolean;
    checkCount: number;
  };
  email: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  phoneNumber: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  tattooStyle: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  tattooPlacement: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  budget: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  referencePhoto: {
    value: File | null;
    hasErrors: boolean;
    checkCount: number;
  };
  placementPhoto: {
    value: File | null;
    readonly hasErrors: boolean;
    checkCount: number;
  };
  tattooDescription: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  requestConfirm: {
    value: boolean;
    hasErrors: boolean;
    checkCount: number;
  };
  hasErrors: boolean;
  submitCount: number;
}

// ADD NEW CASES TO UNION
export type RequestAction =
  | { type: "reset"; value: RequestReducer }
  | { type: "hasErrors"; value: boolean }
  | { type: "startDate"; value: Date | null }
  | { type: "appointmentTime"; value: string }
  | { type: "firstName"; value: string }
  | { type: "lastName"; value: string }
  | { type: "age"; value: number }
  | { type: "email"; value: string }
  | { type: "phoneNumber"; value: string }
  | { type: "tattooStyle"; value: string }
  | { type: "tattooPlacement"; value: string }
  | { type: "budget"; value: string }
  | { type: "referencePhoto"; value: File | null }
  | { type: "placementPhoto"; value: File | null }
  | { type: "tattooDescription"; value: string }
  | { type: "requestConfirm"; value: boolean }
  | { type: "submitCount" }
  | { type: "submitErrorCheck" };
