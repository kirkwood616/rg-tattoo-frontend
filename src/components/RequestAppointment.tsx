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
  let { setAvailableAppointmentsTimes, state } = useContext(RequestContext);

  // NAVIGATE
  let navigate = useNavigate();

  // STATES FOR ERRORS
  const [submitCount, setSubmitCount] = useState<number>(0);

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!state.startDate.value) return;

    let dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(state.startDate.value!, "MM-dd-yyyy"));

    if (dateInDatabase) {
      setAvailableAppointmentsTimes(dateInDatabase.availableTimes);
    } else {
      setAvailableAppointmentsTimes([]);
    }
  }, [availableAppointments, setAvailableAppointmentsTimes, state.startDate.value]);

  // FILE UPLOAD
  function handleReferencePhotoUpload(): void {
    if (!state.referencePhoto.value) return;
    const storageRef = ref(storage, `/images/${state.firstName.value}-${state.lastName.value}-ref-${state.referencePhoto.value.name}`);
    uploadBytesResumable(storageRef, state.referencePhoto.value);
  }

  function handlePlacementPhotoUpload(): void {
    if (!state.placementPhoto.value) return;
    const storageRef = ref(storage, `/images/${state.firstName.value}-${state.lastName.value}-place-${state.placementPhoto.value.name}`);
    uploadBytesResumable(storageRef, state.placementPhoto.value);
  }

  ///// => !! FIX THIS NEXT !! <= \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // HANDLE SUBMIT
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (Object.values(state).includes(true)) {
      return;
    } else {
      let newRequest: AppointmentRequest = {
        requestSubmittedDate: new Date(),
        requestDate: format(state.startDate.value!, "MM-dd-yyyy"),
        requestTime: state.appointmentTime.value,
        firstName: state.firstName.value,
        lastName: state.lastName.value,
        age: state.age.value,
        email: state.email.value.toLowerCase(),
        phoneNumber: state.phoneNumber.value,
        tattooStyle: state.tattooStyle.value,
        tattooPlacement: state.tattooPlacement.value,
        referencePhotoPath: state.referencePhoto.value ? `${state.firstName!.value}-${state.lastName!.value}-ref-${state.referencePhoto.value.name}` : "",
        placementPhotoPath: state.placementPhoto.value ? `${state.firstName!.value}-${state.lastName!.value}-place-${state.placementPhoto.value.name}` : "",
        tattooDescription: state.tattooDescription.value,
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
          <SelectDate />
          {state.startDate.value ? <AppointmentTimes /> : ""}
          <FirstName />
          <LastName />
          <Age />
          <Email />
          <PhoneNumber />
          <TattooStyle />
          <TattooPlacement />
          <ReferenceImage />
          <PlacementImage />
          <TattooDescription />
          <AgeConfirm />
          <GoButton type="submit" text="Submit Request" backgroundColor="green" onClick={() => setSubmitCount(submitCount + 1)} />
        </form>
      </div>
      {isLoading ? <LoadingDotsIcon /> : ""}
    </Page>
  );
}

export default RequestAppointment;
