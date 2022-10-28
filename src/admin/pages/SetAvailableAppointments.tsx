import AdminPage from "admin/components/AdminPage";
import { postAvailableAppointment, updateAvailableAppointment } from "admin/services/AdminApiService";
import { timePickerValues } from "admin/settings/AdminSettings";
import GoButton from "components/buttons/GoButton";
import RemoveButton from "components/buttons/RemoveButton";
import SaveButton from "components/buttons/SaveButton";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import AreYouSure from "components/modals/AreYouSure";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import { format } from "date-fns";
import AvailableAppointments from "models/AvailableAppointments";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const { toggleLoading } = useContext(AppContext);
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
    let newTimes = [...appointmentTimes, time];
    newTimes.sort(function compare(a, b) {
      const dateA: number = Number(new Date("03/27/2022 " + a));
      const dateB: number = Number(new Date("03/27/2022 " + b));
      return dateA - dateB;
    });
    setAppointmentTimes(newTimes);
  }

  function removeTime(index: number): void {
    setAppointmentTimes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  function onSave(): void {
    if (!startDate) return;
    setIsSaveActive((current) => !current);
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
      setIsSaveActive((current) => !current);
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
              backgroundColor="#007bff"
              onClick={() => setAppointmentTimes(timePickerValues!)}
            />
            <GoButton type="button" text="REMOVE ALL TIMES" backgroundColor="red" onClick={() => setAppointmentTimes([])} />
          </div>

          <div className="available-times_container">
            {appointmentTimes.length > 0 &&
              appointmentTimes.map((time, index) => (
                <div className="available-time_container" key={String(startDate) + index}>
                  <span className="available-time">{formatTimeNoLeadingZero(time)}</span>
                  <RemoveButton index={index} onClick={removeTime} />
                </div>
              ))}
            {appointmentTimes.length <= 0 && (
              <label htmlFor="time-picker">
                <div className="no-times-set" onClick={() => setIsTimesActive((current) => !current)}>
                  NO TIMES SET
                </div>
              </label>
            )}
          </div>

          <GoButton
            type="button"
            text="ADD TIME"
            backgroundColor="#007bff"
            onClick={() => setIsTimesActive((current) => !current)}
          />
        </div>

        {isTimesActive && (
          <SelectList
            isSelectActive={isTimesActive}
            setIsSelectActive={setIsTimesActive}
            selectList={timePickerValues!}
            selectFunction={addTime}
          />
        )}

        {isSaveActive && (
          <AreYouSure isActive={isSaveActive} setIsActive={setIsSaveActive} yesFunction={handleSave} yesButtonText="SAVE" />
        )}
      </AdminPage>

      <div className="save-changes">
        <SaveButton type="button" text="SAVE CHANGES" onClick={onSave} />
      </div>
    </>
  );
}

export default SetAvailableAppointments;
