import GoButton from "components/buttons/GoButton";
import FetchError from "components/errors/FetchError";
import Loading from "components/loading/Loading";
import ReviewRequest from "components/modals/ReviewRequest";
import Page from "components/Page";
import * as Field from "components/request-form-fields";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { FormEvent, useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getAvailableAppointments } from "services/ApiService";
import useSWR from "swr";
import "./RequestAppointment.css";

function RequestAppointment() {
  const { toggleModalOpen } = useContext(AppContext);
  const { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const { data: available, error } = useSWR("available-appointments", getAvailableAppointments, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (!state.startDate.value || !available) return;
    const dateInDatabase: AvailableAppointments | undefined = available.find((appointment) => {
      if (state.startDate.value) {
        return appointment.date === format(state.startDate.value, "yyyy/MM/dd");
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
      return;
    } else {
      toggleModalOpen(setIsSubmitActive);
    }
  }

  if (error) return <FetchError fetchError={error} />;
  if (!available) return <Loading />;
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <h1>Request Appointment</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <Field.SelectDate available={available} />
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
              <Field.PhotoUpload photoName="referencePhoto" />
              <Field.PhotoUpload photoName="placementPhoto" />
              <Field.TattooDescription />
              <Field.RequestConfirm />
              {state.appointmentTime.value && (
                <GoButton type="submit" text="SUBMIT REQUEST" cssClass="button_primary" isDisabled={state.hasErrors} />
              )}
              {isSubmitActive && <ReviewRequest isActive={isSubmitActive} setIsActive={setIsSubmitActive} />}
            </>
          )}
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
