import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timePickerValues } from "../../admin/AdminSettings";
import AppContext from "../../context/AppContext";
import AvailableAppointments from "../../models/AvailableAppointments";
import { formatTime } from "../../utils/Formatting";
import GoButton from "../buttons/GoButton";
import RemoveButton from "../buttons/RemoveButton";
import SaveButton from "../buttons/SaveButton";
import AdminPage from "./AdminPage";
import SaveChangesModal from "./modals/SaveChangesModal";
import SelectTimesModal from "./modals/SelectTimesModal";
import "./SetAvailableAppointments.css";

function SetAvailableAppointments() {
  // CONTEXT
  let { availableAppointments } = useContext(AppContext);

  // STATES
  const [appointmentTimes, setAppointmentTimes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [dateId, setDateId] = useState<string>("");
  const [isTimesActive, setIsTimesActive] = useState<boolean>(false);
  const [isSaveActive, setIsSaveActive] = useState<boolean>(false);

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    const dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(startDate!, "MM-dd-yyyy"));

    if (dateInDatabase) {
      setDateId(dateInDatabase._id!);
      setAppointmentTimes(dateInDatabase.availableTimes);
    } else {
      setDateId("");
      setAppointmentTimes([]);
    }
  }, [availableAppointments, startDate]);

  // ADD TIME
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

  // REMOVE TIME
  function removeTime(index: number): void {
    setAppointmentTimes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  // SAVE CHANGES
  function saveChanges(): void {
    if (!startDate) return;
    setIsSaveActive(true);
  }

  return (
    <>
      <AdminPage title="Set Available Appointments">
        <div className="SetAvailableAppointments">
          <h1>Set Available Appointments</h1>

          <div className="date-picker_container">
            <span className="label">
              <label htmlFor="date-picker">Date:</label>
            </span>
            <DatePicker name="date-picker" id="date-picker" withPortal selected={startDate} minDate={new Date()} onChange={(date: Date) => setStartDate(date)} />
          </div>

          <div className="button-container">
            <GoButton type="button" text="ADD ALL TIMES" backgroundColor="#007bff" onClick={() => setAppointmentTimes(timePickerValues!)} />
            <GoButton type="button" text="REMOVE ALL TIMES" backgroundColor="red" onClick={() => setAppointmentTimes([])} />
          </div>

          <div className="available-times_container">
            {appointmentTimes.length > 0 &&
              appointmentTimes.map((time, index) => (
                <div className="available-time_container" key={String(startDate) + index}>
                  <span className="available-time">{formatTime(time)}</span>
                  <RemoveButton index={index} onClick={removeTime} />
                </div>
              ))}
            {appointmentTimes.length <= 0 && (
              <label htmlFor="time-picker">
                <div className="no-times-set">NO TIMES SET</div>
              </label>
            )}
          </div>

          <div className="time-picker_container">
            <span className="label">
              <label htmlFor="time-picker">Times:</label>
            </span>
            <input type="text" name="time-picker" id="time-picker" placeholder="Select Time" value={formatTime(startTime)} onClick={() => setIsTimesActive(true)} readOnly />
          </div>

          <GoButton type="button" text="ADD TIME" backgroundColor="#007bff" onClick={() => addTime(startTime!)} />
        </div>

        {isTimesActive && <SelectTimesModal timeValues={timePickerValues} isTimesActive={isTimesActive} setIsTimesActive={setIsTimesActive} setStartTime={setStartTime} />}

        <SaveChangesModal isSaveActive={isSaveActive} setIsSaveActive={setIsSaveActive} dateId={dateId} startDate={startDate!} appointmentTimes={appointmentTimes} />
      </AdminPage>

      <div className="save-changes">
        <SaveButton type="button" text="SAVE CHANGES" onClick={() => saveChanges()} />
      </div>
    </>
  );
}

export default SetAvailableAppointments;
