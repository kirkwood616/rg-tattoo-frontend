import "./RequestAppointment.css";
import Page from "./Page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import AppointmentRequest from "../models/AppointmentRequest";

function RequestAppointment() {
  // STATES FOR DATES
  const [maxAppointmentDate, setMaxAppointmentDate] = useState<Date>();
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);

  // STATES FOR FORM
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [appointmentTime, setAppointmentTime] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tattooStyle, setTattooStyle] = useState("");
  const [tattooPlacement, setTattooPlacement] = useState("");
  const [referencePhotoPath, setReferencePhotoPath] = useState("");
  const [placementPhotoPath, setPlacementPhotoPath] = useState("");
  const [tattooDescription, setTattooDescription] = useState("");
  const [ofAgeConfirm, setOfAgeConfirm] = useState(false);

  const [emailError, setEmailError] = useState(false);
  console.log(emailError);

  // FUNCTIONS
  function disableSundayMonday(date: Date) {
    return date.getDay() !== 0 && date.getDay() !== 1;
  }

  function emailValidation() {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if (!email || regexp.test(email) === false) {
      setEmailError(true);
      return false;
    }
    setEmailError(false);
    return true;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (emailValidation() === false) {
      console.log("ERROR");
      return;
    }
    let newRequest: AppointmentRequest = {
      requestSubmittedDate: new Date(),
      requestDateTime: appointmentTime!,
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email.toLowerCase(),
      phoneNumber: phoneNumber,
      tattooStyle: tattooStyle,
      tattooPlacement: tattooPlacement,
      referencePhotoPath: referencePhotoPath,
      placementPhotoPath: placementPhotoPath,
      tattooDescription: tattooDescription,
      isRequestApproved: false,
      isRequestDenied: false,
    };
    console.log(newRequest);
    setStartDate(undefined);
    setAppointmentTime(undefined);
    setFirstName("");
    setLastName("");
    setAge(18);
    setEmail("");
    setPhoneNumber("");
    setTattooStyle("");
    setTattooPlacement("");
    setReferencePhotoPath("");
    setPlacementPhotoPath("");
    setTattooDescription("");
    setOfAgeConfirm(false);
    setEmailError(false);
  }

  // RENDER
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <form onSubmit={handleSubmit}>
          <span className="label">
            <label htmlFor="datePicker">Select Date:</label>
          </span>
          <div className="calendarContainer">
            <DatePicker
              name="datePicker"
              id="datePicker"
              placeholderText="Select Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              minDate={new Date()}
              maxDate={maxAppointmentDate}
              filterDate={disableSundayMonday}
              excludeDates={excludedDates}
              isClearable
              withPortal
            />
          </div>

          <div className="apt-times-container">
            AVAILABLE TIMES
            <div className="apt-time">
              <button className="apt-time_button">TIME</button>
            </div>
          </div>

          <span className="label">
            <label htmlFor="firstName">First Name:</label>
          </span>
          <input type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} />

          <span className="label">
            <label htmlFor="lastName">Last Name:</label>
          </span>
          <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} />

          <span className="label">
            <label htmlFor="age">Age:</label>
          </span>
          <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => setAge(Number(e.target.value))} />

          <span className="label">
            <label htmlFor="email">Email:</label>
          </span>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} required />

          <span className="label">
            <label htmlFor="tel">Phone:</label>
          </span>
          <input type="tel" name="tel" id="tel" onChange={(e) => setPhoneNumber(e.target.value)} required />

          <span className="label">
            <label htmlFor="tattooStyle">Tattoo Style:</label>
          </span>
          <select name="tattooStyle" id="tattooStyle" defaultValue={"select"} onChange={(e) => setTattooStyle(e.target.value)} required>
            <option value="select" disabled>
              --- Select Style ---
            </option>
            <option value="Linework">Linework</option>
            <option value="Black & White">Black & White</option>
            <option value="Full Color">Full Color</option>
            <option value="Lettering">Lettering</option>
          </select>

          <span className="label">
            <label htmlFor="tattooPlacement">Tattoo Placement:</label>
          </span>
          <input type="text" name="tattooPlacement" id="tattooPlacement" maxLength={30} onChange={(e) => setTattooPlacement(e.target.value)} />

          <div className="photo-upload">REFERENCE PHOTO UPLOAD HERE</div>
          <div className="photo-upload">PLACEMENT PHOTO UPLOAD HERE</div>

          <span className="label">
            <label htmlFor="tattooDescription">Tattoo Description:</label>
          </span>
          <textarea name="tattooDescription" id="tattooDescription" onChange={(e) => setTattooDescription(e.target.value)} />
          <div className="of-age-confirm">
            <input type="checkbox" name="ofAgeConfirm" id="ofAgeConfirm" onChange={() => setOfAgeConfirm(!ofAgeConfirm)} />
            <label htmlFor="ofAgeConfirm">I confirm that I am or will be 18 years of age by the date of this requested appointment.</label>
          </div>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
