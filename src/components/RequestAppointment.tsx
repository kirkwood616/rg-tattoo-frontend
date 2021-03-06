import { format } from "date-fns";
import { ref, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import RequestContext from "../context/RequestContext";
import { storage } from "../firebaseConfig";
import { AppointmentRequest } from "../models/AppointmentRequest";
import AvailableAppointments from "../models/AvailableAppointments";
import { postAppointmentRequest } from "../services/ApiService";
import GoButton from "./buttons/GoButton";
import LoadingDotsIcon from "./loading/LoadingDotsIcon";
import Page from "./Page";
import Age from "./request-form-fields/Age";
import AppointmentTimes from "./request-form-fields/AppointmentTimes";
import Email from "./request-form-fields/Email";
import FirstName from "./request-form-fields/FirstName";
import LastName from "./request-form-fields/LastName";
import PhoneNumber from "./request-form-fields/PhoneNumber";
import PhotoUpload from "./request-form-fields/PhotoUpload";
import RequestConfirm from "./request-form-fields/RequestConfirm";
import SelectDate from "./request-form-fields/SelectDate";
import TattooDescription from "./request-form-fields/TattooDescription";
import TattooPlacement from "./request-form-fields/TattooPlacement";
import TattooStyle from "./request-form-fields/TattooStyle";
import "./RequestAppointment.css";

function RequestAppointment() {
  // CONTEXT
  let { availableAppointments, isLoading, setIsLoading } = useContext(AppContext);
  let { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);

  // NAVIGATE
  let navigate = useNavigate();

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!state.startDate.value) return;
    const dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(state.startDate.value!, "MM-dd-yyyy"));
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

  // HANDLE SUBMIT
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    dispatch({ type: "submitCount" });
    if (state.hasErrors) {
      console.log("ERRORS");
      return;
    } else {
      console.log("SUBMITTED");
      const newRequest: AppointmentRequest = {
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
        referencePhotoPath: state.referencePhoto.value ? `${state.firstName.value}-${state.lastName!.value}-ref-${state.referencePhoto.value.name}` : "",
        placementPhotoPath: state.placementPhoto.value ? `${state.firstName.value}-${state.lastName!.value}-place-${state.placementPhoto.value.name}` : "",
        tattooDescription: state.tattooDescription.value,
        requestConfirm: state.requestConfirm.value,
        isDepositReceived: false,
        isRequestApproved: false,
        isRequestDenied: false,
        isRequestCanceled: false,
        isCompleted: false,
        isRequestClosed: false,
        priceCharged: 0,
        notes: [],
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
          {state.startDate.value && <AppointmentTimes />}
          {state.appointmentTime.value && (
            <>
              <FirstName />
              <LastName />
              <Age />
              <Email />
              <PhoneNumber />
              <TattooStyle />
              <TattooPlacement />
              <PhotoUpload name="referencePhoto" />
              <PhotoUpload name="placementPhoto" />
              <TattooDescription />
              <RequestConfirm />
              {state.appointmentTime.value && <GoButton type="submit" text="Submit Request" backgroundColor="green" isDisabled={false} />}
            </>
          )}
        </form>
      </div>
      {isLoading && <LoadingDotsIcon />}
    </Page>
  );
}

export default RequestAppointment;
