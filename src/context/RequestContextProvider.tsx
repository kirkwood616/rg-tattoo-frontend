import { ReactNode, useState } from "react";
import RequestContext from "./RequestContext";

interface Props {
  children: ReactNode;
}

export default function RequestContextProvider({ children }: Props) {
  // STATES FOR FORM
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [tattooStyle, setTattooStyle] = useState<string>("select");
  const [tattooPlacement, setTattooPlacement] = useState<string>("");
  const [tattooDescription, setTattooDescription] = useState<string>("");
  const [ofAgeConfirm, setOfAgeConfirm] = useState<boolean>(false);

  return (
    <RequestContext.Provider
      value={{
        startDate,
        setStartDate,
        availableAppointmentTimes,
        setAvailableAppointmentsTimes,
        appointmentTime,
        setAppointmentTime,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        age,
        setAge,
        email,
        setEmail,
        phoneNumber,
        setPhoneNumber,
        tattooStyle,
        setTattooStyle,
        tattooPlacement,
        setTattooPlacement,
        tattooDescription,
        setTattooDescription,
        ofAgeConfirm,
        setOfAgeConfirm,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
