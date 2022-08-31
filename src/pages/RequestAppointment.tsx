import GoButton from "components/buttons/GoButton";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import Page from "components/Page";
import * as Field from "components/request-form-fields";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import { AppointmentRequest } from "models/AppointmentRequest";
import AvailableAppointments from "models/AvailableAppointments";
import { FormEvent, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { getAvailableAppointments, postAppointmentRequest } from "services/ApiService";
import useSWR from "swr";
import { handlePlacementPhotoUpload, handleReferencePhotoUpload } from "utils/PhotoUpload";
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
    if (!state.startDate.value || !available) return;
    const dateInDatabase: AvailableAppointments | undefined = available.find((appointment) => {
      if (state.startDate.value) {
        return appointment.date === format(state.startDate.value, "MM-dd-yyyy");
      } else {
        return undefined;
      }
    });
    if (dateInDatabase) {
      setAvailableAppointmentsTimes(dateInDatabase.availableTimes);
    } else {
      setAvailableAppointmentsTimes([]);
    }
  }, [state.startDate.value, available, setAvailableAppointmentsTimes]);

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
          handleReferencePhotoUpload(state);
          if (state.placementPhoto.value) handlePlacementPhotoUpload(state);
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
