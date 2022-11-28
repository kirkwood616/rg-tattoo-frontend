import GoButton from "components/buttons/GoButton";
import FetchError from "components/errors/FetchError";
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
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { data: available, error } = useSWR("available-appointments", getAvailableAppointments, {
    revalidateOnFocus: false,
  });

  const navigate = useNavigate();

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!state.startDate.value || !available) return;
    const dateInDatabase: AvailableAppointments | undefined = available.find((appointment) => {
      if (state.startDate.value) {
        return appointment.date === format(state.startDate.value, "yyyy-MM-dd");
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

  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    dispatch({ type: "submitCount" });
    if (state.hasErrors) {
      console.log("ERRORS");
      return;
    } else {
      toggleModalOpen(setIsSubmitActive);
    }
  }

  async function handleSubmit(): Promise<void> {
    toggleLoading();
    const newRequest = generateNewRequest(state);
    try {
      await postAppointmentRequest(newRequest);
      await handlePhotoUpload(state, "reference");
      if (state.placementPhoto.value) {
        await handlePhotoUpload(state, "placement");
      }
      toggleModalOpen(setIsSubmitActive);
      navigate("/request-submitted");
    } catch (error) {
      console.error(error);
      navigate("/aftercare");
    } finally {
      toggleLoading();
    }
  }

  if (error) return <FetchError fetchError={error} />;
  if (!available) return <LoadingDotsIcon />;
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <h1>Request Appointment</h1>
        <form onSubmit={(e) => onSubmit(e)}>
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
              {state.referencePhoto.value && <Field.PhotoUpload name="placementPhoto" />}
              <Field.TattooDescription />
              <Field.RequestConfirm />
              {state.appointmentTime.value && (
                <GoButton
                  type="submit"
                  text="SUBMIT REQUEST"
                  backgroundColor={state.hasErrors ? "var(--dark-gray-3)" : "green"}
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
