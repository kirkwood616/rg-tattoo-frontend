export interface ReducerModel {
  [key: string]:
    | {
        value: Date | undefined | string | boolean | number | File | null;
        hasErrors: boolean;
        checkCount: number;
      }
    | boolean;
}

export interface FieldValues {
  value: Date | undefined | string | boolean | number | File | null;
  hasErrors: boolean;
  checkCount: number;
}

export interface RequestReducer extends ReducerModel {
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
  | { type: "reset"; value: RequestReducer }
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
