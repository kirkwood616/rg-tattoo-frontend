import * as Field from "components/features/request-form-fields";
import ReviewRequest from "components/features/review-request/ReviewRequest";
import GoButton from "components/ui/buttons/GoButton";
import FetchError from "components/ui/errors/FetchError";
import Loading from "components/ui/loading/Loading";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { FormEvent, useContext, useEffect, useState } from "react";
import { getAvailableAppointments } from "services/AppointmentService";
import { swrOptions } from "settings/swr-options";
import styles from "styles/pages/RequestAppointment.module.css";
import useSWR from "swr";
import { toggleBooleanState } from "utils/Toggle";

export default function RequestAppointment() {
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
  const { setAvailableAppointmentsTimes, state, dispatch } = useContext(RequestContext);
  const { data: available, error } = useSWR<AvailableAppointments[] | undefined, Error>(
    "available-appointments",
    getAvailableAppointments,
    swrOptions
  );

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
    dispatch({ type: "submitErrorCheck" });
    if (!state.hasErrors) toggleBooleanState(setIsSubmitActive);
  }

  if (error) return <FetchError fetchError={error} />;
  if (!available) return <Loading />;
  return (
    <div className={styles.RequestAppointment}>
      <h1>REQUEST APPOINTMENT</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <GoButton text={"DEV FILL"} onClick={() => dispatch({ type: "dev" })} />
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
            <GoButton type="submit" text="SUBMIT REQUEST" cssClass="button__primary" isDisabled={state.hasErrors} />
            {isSubmitActive && <ReviewRequest setIsActive={setIsSubmitActive} />}
          </>
        )}
      </form>
    </div>
  );
}
