import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import AppContext from "../../context/AppContext";
import AvailableAppointments from "../../models/AvailableAppointments";
import { postAvailableAppointment } from "../../services/AdminApiService";
import { updateAvailableAppointment } from "../../services/AdminApiService";
import GoButton from "../buttons/GoButton";
import RemoveButton from "../buttons/RemoveButton";
import SaveButton from "../buttons/SaveButton";
import "react-datepicker/dist/react-datepicker.css";
import "./SetAvailableAppointments.css";
import AdminPage from "./AdminPage";

function SetAvailableAppointments() {
  // CONTEXT
  let { availableAppointments, handleAvailableAppointments } = useContext(AppContext);

  // STATES
  const [appointmentTimes, setAppointmentTimes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<Date | null>();
  const [dateId, setDateId] = useState<string>("");

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    let dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(startDate!, "MM-dd-yyyy"));

    if (dateInDatabase) {
      setDateId(dateInDatabase._id!);
      setAppointmentTimes(dateInDatabase.availableTimes);
    } else {
      setDateId("");
      setAppointmentTimes([]);
    }
  }, [availableAppointments, startDate]);

  // FUNCTIONS
  function addTime(time: Date) {
    if (!time) return;
    let isoTime = time.toISOString();
    if (appointmentTimes.includes(isoTime)) return;
    let newTimes = [...appointmentTimes, isoTime].sort();
    setAppointmentTimes(newTimes);
  }

  function removeTime(index: number) {
    setAppointmentTimes((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  function saveChanges() {
    if (!startDate) return;
    if (window.confirm("Are You Sure?")) {
      let appointmentDateTimes: AvailableAppointments = {
        date: format(startDate!, "MM-dd-yyyy"),
        availableTimes: appointmentTimes!,
      };
      if (dateId) {
        updateAvailableAppointment(dateId, appointmentDateTimes)
          .then(() => handleAvailableAppointments())
          .then(() => {
            setAppointmentTimes([]);
            setStartDate(new Date());
            setStartTime(null);
            setDateId("");
          });
      } else {
        postAvailableAppointment(appointmentDateTimes)
          .then(() => handleAvailableAppointments())
          .then(() => {
            setAppointmentTimes([]);
            setStartDate(new Date());
            setStartTime(null);
          });
      }
    }
  }

  return (
    <AdminPage title="Set Available Appointments">
      <div className="SetAvailableAppointments">
        <h1>Set Available Appointments</h1>
        <div className="date-picker_container">
          <span className="label">
            <label htmlFor="date-picker">Date:</label>
          </span>
          <DatePicker name="date-picker" id="date-picker" withPortal selected={startDate} minDate={new Date()} onChange={(date: Date) => setStartDate(date)} />
        </div>
        <div className="available-times_container">
          {appointmentTimes.length ? (
            appointmentTimes.map((time, index) => (
              <div className="available-time_container" key={index}>
                <span className="available-time">{format(new Date(time), "h:mm a")}</span>
                <RemoveButton index={index} onClick={removeTime} />
              </div>
            ))
          ) : (
            <label htmlFor="time-picker">
              <div className="no-times-set">NO TIMES SET</div>
            </label>
          )}
        </div>
        <div className="time-picker_container">
          <span className="label">
            <label htmlFor="time-picker">Times:</label>
          </span>
          <DatePicker
            name="time-picker"
            id="time-picker"
            selected={startTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            onChange={(date) => setStartTime(date)}
            dateFormat="h:mm a"
            withPortal
          />
        </div>
        <GoButton type="button" text="ADD TIME" onClick={() => addTime(startTime!)} />
      </div>
      <div className="save-changes">
        <SaveButton type="button" text="SAVE CHANGES" onClick={() => saveChanges()} />
      </div>
    </AdminPage>
  );
}

export default SetAvailableAppointments;
