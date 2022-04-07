import { FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import { postAppointmentRequest } from "../services/ApiService";
import AppointmentRequest from "../models/AppointmentRequest";
import AvailableAppointments from "../models/AvailableAppointments";
import Page from "./Page";
import SelectDate from "./request-form-fields/SelectDate";
import AppointmentTimes from "./request-form-fields/AppointmentTimes";
import FirstName from "./request-form-fields/FirstName";
import LastName from "./request-form-fields/LastName";
import Age from "./request-form-fields/Age";
import Email from "./request-form-fields/Email";
import PhoneNumber from "./request-form-fields/PhoneNumber";
import TattooStyle from "./request-form-fields/TattooStyle";
import TattooPlacement from "./request-form-fields/TattooPlacement";
import ReferenceImage from "./request-form-fields/ReferenceImage";
import PlacementImage from "./request-form-fields/PlacementImage";
import TattooDescription from "./request-form-fields/TattooDescription";
import AgeConfirm from "./request-form-fields/AgeConfirm";
import GoButton from "./buttons/GoButton";
import LoadingDotsIcon from "./loading/LoadingDotsIcon";
import "react-datepicker/dist/react-datepicker.css";
import "./RequestAppointment.css";
import RequestContext from "../context/RequestContext";

function RequestAppointment() {
  // CONTEXT
  let { availableAppointments, isLoading, setIsLoading } = useContext(AppContext);
  let { startDate, setAvailableAppointmentsTimes, appointmentTime, firstName, lastName, age, email, phoneNumber, tattooStyle, tattooPlacement, tattooDescription } =
    useContext(RequestContext);

  // NAVIGATE
  let navigate = useNavigate();

  // STATES FOR FILES
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [placementImage, setPlacementImage] = useState<File | null>(null);

  // STATES FOR ERRORS
  const [submitCount, setSubmitCount] = useState<number>(0);
  const [errors, setErrors] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [appointmentTimeError, setAppointmentTimeError] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [tattooStyleError, setTattooStyleError] = useState<boolean>(false);
  const [tattooPlacementError, setTattooPlacementError] = useState<boolean>(false);
  const [tattooDescriptionError, setTattooDescriptionError] = useState<boolean>(false);

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!startDate) return;

    let dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(startDate!, "MM-dd-yyyy"));

    if (dateInDatabase) {
      setAvailableAppointmentsTimes(dateInDatabase.availableTimes);
    } else {
      setAvailableAppointmentsTimes([]);
    }
  }, [availableAppointments, setAvailableAppointmentsTimes, startDate]);

  // FILE UPLOAD
  function handleReferencePhotoUpload(): void {
    if (!referenceImage) return;
    const storageRef = ref(storage, `/images/${firstName}-${lastName}-ref-${referenceImage.name}`);
    uploadBytesResumable(storageRef, referenceImage);
  }

  function handlePlacementPhotoUpload(): void {
    if (!placementImage) return;
    const storageRef = ref(storage, `/images/${firstName}-${lastName}-place-${placementImage.name}`);
    uploadBytesResumable(storageRef, placementImage);
  }

  // ERRORS
  useEffect(() => {
    if (startDateError || firstNameError || lastNameError || ageError || emailError || phoneError || tattooStyleError || tattooPlacementError || tattooDescriptionError) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [ageError, emailError, firstNameError, lastNameError, phoneError, startDateError, tattooDescriptionError, tattooPlacementError, tattooStyleError]);

  useEffect(() => {
    if (submitCount > 0) {
      if (startDate) setStartDateError(false);
      if (!startDate) setStartDateError(true);
      if (appointmentTime === "" || null) setAppointmentTimeError(true);
      if (appointmentTime !== "") setAppointmentTimeError(false);
      if (!firstName) setFirstNameError(true);
      if (!lastName) setLastNameError(true);
      if (!email) setEmailError(true);
      if (!phoneNumber) setPhoneError(true);
      if (tattooStyle === "select") setTattooStyleError(true);
      if (!tattooPlacement) setTattooPlacementError(true);
      if (!tattooDescription) setTattooDescriptionError(true);
    }
  }, [submitCount, firstName, lastName, email, phoneNumber, tattooStyle, tattooPlacement, tattooDescription, startDate, appointmentTime]);

  // HANDLE SUBMIT
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (tattooStyle === "select") {
      setTattooStyleError(true);
      return;
    }
    if (errors) {
      return;
    } else {
      let newRequest: AppointmentRequest = {
        requestSubmittedDate: new Date(),
        requestDate: format(startDate!, "MM-dd-yyyy"),
        requestTime: appointmentTime,
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email.toLowerCase(),
        phoneNumber: phoneNumber,
        tattooStyle: tattooStyle,
        tattooPlacement: tattooPlacement,
        referencePhotoPath: referenceImage ? `${firstName!}-${lastName!}-ref-${referenceImage!.name}` : "",
        placementPhotoPath: placementImage ? `${firstName!}-${lastName!}-place-${placementImage!.name}` : "",
        tattooDescription: tattooDescription,
        isRequestApproved: false,
        isRequestDenied: false,
      };
      setIsLoading(true);
      postAppointmentRequest(newRequest)
        .then(() => {
          handleReferencePhotoUpload();
          handlePlacementPhotoUpload();
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
          navigate("/request-submitted");
        });
    }
  }

  // RENDER
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <h1>Request Appointment</h1>
        <form onSubmit={handleSubmit}>
          <SelectDate startDateError={startDateError} />
          {startDate ? <AppointmentTimes appointmentTimeError={appointmentTimeError} /> : ""}
          <FirstName firstNameError={firstNameError} setFirstNameError={setFirstNameError} />
          <LastName lastNameError={lastNameError} setLastNameError={setLastNameError} />
          <Age ageError={ageError} setAgeError={setAgeError} />
          <Email emailError={emailError} setEmailError={setEmailError} />
          <PhoneNumber phoneError={phoneError} setPhoneError={setPhoneError} />
          <TattooStyle tattooStyleError={tattooStyleError} setTattooStyleError={setTattooStyleError} />
          <TattooPlacement tattooPlacementError={tattooPlacementError} setTattooPlacementError={setTattooPlacementError} />
          <ReferenceImage setReferenceImage={setReferenceImage} />
          <PlacementImage setPlacementImage={setPlacementImage} />
          <TattooDescription tattooDescriptionError={tattooDescriptionError} setTattooDescriptionError={setTattooDescriptionError} />
          <AgeConfirm />
          <GoButton type="submit" text="Submit Request" backgroundColor="green" onClick={() => setSubmitCount(submitCount + 1)} />
        </form>
      </div>
      {isLoading ? <LoadingDotsIcon /> : ""}
    </Page>
  );
}

export default RequestAppointment;
