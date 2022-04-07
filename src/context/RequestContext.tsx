import { createContext, Dispatch, SetStateAction } from "react";

interface RequestContextModel {
  startDate: Date | undefined;
  setStartDate: Dispatch<SetStateAction<Date | undefined>>;
  availableAppointmentTimes: string[];
  setAvailableAppointmentsTimes: Dispatch<SetStateAction<string[]>>;
  appointmentTime: string;
  setAppointmentTime: Dispatch<SetStateAction<string>>;
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  age: number;
  setAge: Dispatch<SetStateAction<number>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  tattooStyle: string;
  setTattooStyle: Dispatch<SetStateAction<string>>;
  tattooPlacement: string;
  setTattooPlacement: Dispatch<SetStateAction<string>>;
  tattooDescription: string;
  setTattooDescription: Dispatch<SetStateAction<string>>;
  ofAgeConfirm: boolean;
  setOfAgeConfirm: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: RequestContextModel = {
  startDate: undefined,
  setStartDate: () => {},
  availableAppointmentTimes: [],
  setAvailableAppointmentsTimes: () => {},
  appointmentTime: "",
  setAppointmentTime: () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  age: 18,
  setAge: () => {},
  email: "",
  setEmail: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  tattooStyle: "",
  setTattooStyle: () => {},
  tattooPlacement: "",
  setTattooPlacement: () => {},
  tattooDescription: "",
  setTattooDescription: () => {},
  ofAgeConfirm: false,
  setOfAgeConfirm: () => {},
};

const RequestContext = createContext(defaultValue);

export default RequestContext;
