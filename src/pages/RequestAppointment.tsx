import GoButton from "components/buttons/GoButton";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import AreYouSure from "components/modals/AreYouSure";
import Page from "components/Page";
import * as Field from "components/request-form-fields";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { FormEvent, useContext, useEffect, useState } from "react";
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

  // STATE
  const [isSubmitActive, setIsSubmitActive] = useState(false);

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
  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    setIsSubmitActive((current) => !current);
  }

  function handleSubmit(): void {
    dispatch({ type: "submitCount" });
    if (state.hasErrors) {
      console.log("ERRORS");
      return;
    } else {
      const newRequest = generateNewRequest(state);
      setIsLoading((current) => !current);
      postAppointmentRequest(newRequest)
        .then(() => {
          handlePhotoUpload(state, "reference");
          if (state.placementPhoto.value) handlePhotoUpload(state, "placement");
        })
        .catch((error) => {
          console.error(error);
          setIsLoading((current) => !current);
          navigate("/");
        })
        .then(() => {
          setIsLoading((current) => !current);
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
        <form onSubmit={onSubmit}>
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
                <GoButton
                  type="button"
                  text="Submit Request"
                  backgroundColor="green"
                  isDisabled={false}
                  onClick={() => setIsSubmitActive((current) => !current)}
                />
              )}
              {isSubmitActive && (
                <AreYouSure
                  isActive={isSubmitActive}
                  setIsActive={setIsSubmitActive}
                  yesFunction={handleSubmit}
                  yesButtonText="YES"
                />
              )}
            </>
          )}
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
