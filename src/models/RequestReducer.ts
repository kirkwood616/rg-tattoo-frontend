export interface RequestReducer {
  startDate: {
    value: Date | undefined;
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
  referencePhoto: {
    value: File | null;
    hasErrors: boolean;
    checkCount: number;
  };
  placementPhoto: {
    value: File | null;
    hasErrors: boolean;
    checkCount: number;
  };
  tattooDescription: {
    value: string;
    hasErrors: boolean;
    checkCount: number;
  };
  ageConfirm: {
    value: boolean;
    hasErrors: boolean;
    checkCount: number;
  };
  hasErrors: boolean;
}

export type RequestAction =
  | { type: "dateInput"; field: string; value: Date | undefined }
  | { type: "stringInput"; field: string; value: string }
  | { type: "numberInput"; field: string; value: number }
  | { type: "fileInput"; field: string; value: File | null }
  | { type: "error"; field: string; value: boolean }
  | { type: "errors"; field: string; value: boolean }
  | { type: "checkCount"; field: string; value: number }
  | { type: "startDate"; value: Date | undefined }
  | { type: "appointmentTime"; value: string }
  | { type: "firstName"; value: string }
  | { type: "lastName"; value: string }
  | { type: "age"; value: number }
  | { type: "email"; value: string }
  | { type: "phoneNumber"; value: string }
  | { type: "tattooStyle"; value: string }
  | { type: "tattooPlacement"; value: string }
  | { type: "referencePhoto"; value: File | null }
  | { type: "placementPhoto"; value: File | null }
  | { type: "tattooDescription"; value: string }
  | { type: "ageConfirm"; value: boolean };
