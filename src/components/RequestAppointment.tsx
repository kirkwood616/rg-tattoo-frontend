import { format } from "date-fns";
import { ref, uploadBytesResumable } from "firebase/storage";
import { FormEvent, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import AppContext from "../context/AppContext";
import RequestContext from "../context/RequestContext";
import { storage } from "../firebaseConfig";
import { AppointmentRequest } from "../models/AppointmentRequest";
import AvailableAppointments from "../models/AvailableAppointments";
import { getAvailableAppointments, postAppointmentRequest } from "../services/ApiService";
import GoButton from "./buttons/GoButton";
import LoadingDotsIcon from "./loading/LoadingDotsIcon";
import Page from "./Page";
import * as Field from "./request-form-fields";
import "./RequestAppointment.css";

function RequestAppointment() {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);
  const { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);

  // SWR
  const { data: available, error } = useSWR("/available-appointments", getAvailableAppointments, { revalidateOnFocus: false });

  // NAVIGATE
  const navigate = useNavigate();

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!state.startDate.value) return;
    const dateInDatabase: AvailableAppointments | undefined = available!.find((appointment) => appointment.date === format(state.startDate.value!, "MM-dd-yyyy"));
    if (dateInDatabase) {
      setAvailableAppointmentsTimes(dateInDatabase.availableTimes);
    } else {
      setAvailableAppointmentsTimes([]);
    }
  }, [state.startDate.value, available, setAvailableAppointmentsTimes]);

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
        requestStatus: "new",
        depositAmmountReceived: 0,
        isRequestClosed: false,
        priceCharged: 0,
        historyLog: [
          {
            dateCreated: new Date(),
            action: "New Appointment Request Submitted.",
          },
        ],
      };
      setIsLoading(true);
      postAppointmentRequest(newRequest)
        .then(() => {
          handleReferencePhotoUpload();
          if (state.placementPhoto.value) handlePlacementPhotoUpload();
        })
        .catch((error) => console.error(error))
        .then(() => {
          setIsLoading(false);
          navigate("/request-submitted");
        });
    }
  }

  // RENDER
  if (error) return <h1>Something went wrong!</h1>;
  if (!available) return <LoadingDotsIcon />;
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <h1>Request Appointment</h1>
        <form onSubmit={handleSubmit}>
          <Field.SelectDate />
          {state.startDate.value && <Field.AppointmentTimes />}
          {state.appointmentTime.value && (
            <>
              <Field.FirstName />
              <Field.LastName />
              <Field.Age />
              <Field.Email />
              <Field.PhoneNumber />
              <Field.TattooStyle />
              <Field.TattooPlacement />
              <Field.PhotoUpload name="referencePhoto" />
              <Field.PhotoUpload name="placementPhoto" />
              <Field.TattooDescription />
              <Field.RequestConfirm />
              {state.appointmentTime.value && <GoButton type="submit" text="Submit Request" backgroundColor="green" isDisabled={false} />}
            </>
          )}
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
