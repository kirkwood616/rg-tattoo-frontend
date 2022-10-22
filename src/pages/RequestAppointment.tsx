import GoButton from "components/buttons/GoButton";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import Page from "components/Page";
import * as Field from "components/request-form-fields";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { FormEvent, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { getAvailableAppointments, postAppointmentRequest } from "services/ApiService";
import useSWR from "swr";
import { handlePhotoUpload } from "utils/PhotoUpload";
import { generateNewRequest } from "utils/Request";
import "./RequestAppointment.css";

function RequestAppointment() {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);
  const { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);

  // SWR
  const { data: available, error } = useSWR("/available-appointments", getAvailableAppointments, {
    revalidateOnFocus: false,
  });

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
      const newRequest = generateNewRequest(state);
      setIsLoading(true);
      postAppointmentRequest(newRequest)
        .then(() => {
          handlePhotoUpload(state, "reference");
          if (state.placementPhoto.value) handlePhotoUpload(state, "placement");
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
              <Field.Budget />
              <Field.PhotoUpload name="referencePhoto" />
              <Field.PhotoUpload name="placementPhoto" />
              <Field.TattooDescription />
              <Field.RequestConfirm />
              {state.appointmentTime.value && (
                <GoButton type="submit" text="Submit Request" backgroundColor="green" isDisabled={false} />
              )}
            </>
          )}
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
