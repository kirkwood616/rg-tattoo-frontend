import AdminPage from "admin/components/AdminPage";
import { postAvailableAppointment, updateAvailableAppointment } from "admin/services/AdminApiService";
import { timePickerValues } from "admin/settings/AdminSettings";
import GoButton from "components/buttons/GoButton";
import RemoveButton from "components/buttons/RemoveButton";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import AreYouSure from "components/modals/AreYouSure";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getAvailableAppointments } from "services/ApiService";
import useSWR, { useSWRConfig } from "swr";
import { formatTimeNoLeadingZero } from "utils/Formatting";
import "./SetAvailableAppointments.css";

function SetAvailableAppointments() {
  const [appointmentTimes, setAppointmentTimes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [dateId, setDateId] = useState<string>("");
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);

  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { data: available, error: availableError } = useSWR("/available-appointments", getAvailableAppointments, {
    revalidateOnFocus: false,
  });
  const { mutate } = useSWRConfig();

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!available) return;
    const dateInDatabase: AvailableAppointments | undefined = available.find(
      (date) => date.date === format(startDate!, "yyyy-MM-dd")
    );

    if (dateInDatabase) {
      setDateId(dateInDatabase._id!);
      setAppointmentTimes(dateInDatabase.availableTimes);
    } else {
      setDateId("");
      setAppointmentTimes([]);
    }
  }, [available, startDate]);

  function addTime(time: string): void {
    if (!time) return;
    if (appointmentTimes.includes(time)) return;
    setAppointmentTimes((prev) =>
      [...prev, time].sort((a, b) => {
        const dateA = Number(new Date("03/27/2022 " + a));
        const dateB = Number(new Date("03/27/2022 " + b));
        return dateA - dateB;
      })
    );
  }

  function removeTime(index: number): void {
    setAppointmentTimes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  function filterTimes() {
    if (!timePickerValues) return [];
    const timesList = timePickerValues.filter((item) => !appointmentTimes.includes(item));
    return timesList;
  }

  function onSave(): void {
    if (!startDate) return;
    toggleModalOpen(setIsSaveActive);
  }

  async function handleSave(): Promise<void> {
    if (!startDate) return;
    toggleLoading();

    const appointmentDateTimes: AvailableAppointments = {
      date: format(startDate, "yyyy-MM-dd"),
      availableTimes: appointmentTimes,
    };

    try {
      if (dateId) {
        await updateAvailableAppointment(dateId, appointmentDateTimes);
      } else {
        await postAvailableAppointment(appointmentDateTimes);
      }
      await mutate("/available-appointments");
      toggleModalOpen(setIsSaveActive);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  if (availableError) return <h1>Something went wrong!</h1>;
  if (!available) return <LoadingDotsIcon />;
  return (
    <>
      <AdminPage title="Set Available Appointments">
        <div className="SetAvailableAppointments">
          <h1>Set Available Appointments</h1>

          <div className="date-picker_container">
            <span className="label">
              <label htmlFor="date-picker">Date:</label>
            </span>
            <DatePicker
              name="date-picker"
              id="date-picker"
              withPortal
              selected={startDate}
              minDate={new Date()}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>

          <div className="button-container">
            <GoButton
              type="button"
              text="ADD ALL TIMES"
              backgroundColor="var(--dark-gray-1)"
              onClick={() => setAppointmentTimes(timePickerValues!)}
            />
            <GoButton
              type="button"
              text="REMOVE ALL TIMES"
              backgroundColor="var(--dark-gray-1)"
              onClick={() => setAppointmentTimes([])}
            />
          </div>

          <GoButton type="button" text="ADD TIME" onClick={() => toggleModalOpen(setIsTimesActive)} />

          <TransitionGroup className="available-times_container">
            {appointmentTimes.length > 0 &&
              appointmentTimes.map((time, index) => (
                <CSSTransition key={time} timeout={250} classNames="time">
                  <div className="time">
                    <span className="available-time">{formatTimeNoLeadingZero(time)}</span>
                    <RemoveButton onClick={() => removeTime(index)} />
                  </div>
                </CSSTransition>
              ))}
          </TransitionGroup>

          <CSSTransition in={!appointmentTimes.length} unmountOnExit timeout={50} classNames="no-times-set">
            <div className="no-times-set" onClick={() => toggleModalOpen(setIsTimesActive)}>
              NO TIMES SET
            </div>
          </CSSTransition>
        </div>

        {isTimesActive && (
          <SelectList
            isSelectActive={isTimesActive}
            setIsSelectActive={setIsTimesActive}
            selectList={filterTimes()}
            selectFunction={addTime}
            formatter={formatTimeNoLeadingZero}
          />
        )}

        {isSaveActive && (
          <AreYouSure isActive={isSaveActive} setIsActive={setIsSaveActive} yesFunction={handleSave} yesButtonText="SAVE" />
        )}
      </AdminPage>

      <div className="save-changes">
        <GoButton type="button" text="SAVE CHANGES" onClick={onSave} />
      </div>
    </>
  );
}

export default SetAvailableAppointments;
