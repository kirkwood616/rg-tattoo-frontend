import "./RequestAppointment.css";
import Page from "./Page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ChangeEvent, FormEvent, InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from "react";
import AppointmentRequest from "../models/AppointmentRequest";
import ErrorMessage from "./ErrorMessage";

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
  const [tattooStyle, setTattooStyle] = useState("select");
  const [tattooPlacement, setTattooPlacement] = useState("");
  const [referencePhotoPath, setReferencePhotoPath] = useState("");
  const [placementPhotoPath, setPlacementPhotoPath] = useState("");
  const [tattooDescription, setTattooDescription] = useState("");
  const [ofAgeConfirm, setOfAgeConfirm] = useState(false);

  // STATES FOR ERRORS
  const [errors, setErrors] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [tattooStyleError, setTattooStyleError] = useState(false);
  const [tattooPlacementError, setTattooPlacementError] = useState(false);
  const [tattooDescriptionError, setTattooDescriptionError] = useState(false);

  console.log(errors);

  function validateFirstName(e: ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
    if (e.target.value.length < 1) setFirstNameError(true);
    if (e.target.value.length >= 1) setFirstNameError(false);
  }

  function validateLastName(e: ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
    if (e.target.value.length < 1) setLastNameError(true);
    if (e.target.value.length > 1) setLastNameError(false);
  }

  function validateAge(e: ChangeEvent<HTMLInputElement>) {
    setAge(Number(e.target.value));
    if (Number(e.target.value) < 18) setAgeError(true);
    if (Number(e.target.value) >= 18) setAgeError(false);
  }

  // E-MAIL VALIDATION
  function emailValidation() {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if (!email || regexp.test(email) === false) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  }

  useEffect(() => {
    if (email) {
      const delay = setTimeout(() => emailValidation(), 800);
      return () => clearTimeout(delay);
    }
  }, [email]);

  // PHONE # VALIDATION
  function formatPhoneNumber(value: string) {
    if (!value) return value;
    const phoneNumberInput = value.replace(/[^\d]/g, "");
    const phoneNumberInputLength = phoneNumberInput.length;
    if (phoneNumberInputLength < 4) return phoneNumberInput;
    if (phoneNumberInputLength < 7) return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3)}`;
    return `(${phoneNumberInput.slice(0, 3)}) ${phoneNumberInput.slice(3, 6)}-${phoneNumberInput.slice(6, 10)}`;
  }

  function handlePhoneNumberInput(e: ChangeEvent<HTMLInputElement>) {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  }

  useEffect(() => {
    if (phoneNumber) {
      const delay = setTimeout(() => {
        if (phoneNumber && phoneNumber.length < 14) {
          setPhoneError(true);
        }
        if (phoneNumber.length === 14) {
          setPhoneError(false);
        }
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [phoneNumber]);

  // TATTOO STYLE VALIDATION
  useEffect(() => {
    if (tattooStyle !== "select") setTattooStyleError(false);
  }, [tattooStyle]);

  // TATTOO PLACEMENT VALIDATION
  function validateTattooPlacement(e: ChangeEvent<HTMLInputElement>) {
    setTattooPlacement(e.target.value);
    if (e.target.value.length < 2) setTattooPlacementError(true);
    if (e.target.value.length > 2) setTattooPlacementError(false);
  }

  // TATTOO DESCRIPTION VALIDATION
  function validateTattooDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    setTattooDescription(e.target.value);
    if (e.target.value.length < 7) setTattooDescriptionError(true);
    if (e.target.value.length >= 7) setTattooDescriptionError(false);
  }

  // HANDLE SUBMIT W/ E-MAIL VALIDATION
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (tattooStyle === "select") {
      setTattooStyleError(true);
      return;
    }
    if (errors) {
      return;
    } else {
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
      setTattooStyle("select");
      setTattooPlacement("");
      setReferencePhotoPath("");
      setPlacementPhotoPath("");
      setTattooDescription("");
    }
  }

  // DIABLE OFF-DAYS OF SUNDAY & MONDAYS ON CALENDAR
  function disableSundayMonday(date: Date) {
    return date.getDay() !== 0 && date.getDay() !== 1;
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
              required
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
          <input type="text" name="firstName" id="firstName" onChange={(e) => validateFirstName(e)} value={firstName} />
          {firstNameError ? <ErrorMessage message={"FIRST NAME REQUIRED"} /> : ""}

          <span className="label">
            <label htmlFor="lastName">Last Name:</label>
          </span>
          <input type="text" name="lastName" id="lastName" onChange={(e) => validateLastName(e)} value={lastName} required />
          {lastNameError ? <ErrorMessage message={"LAST NAME REQUIRED"} /> : ""}

          <span className="label">
            <label htmlFor="age">Age:</label>
          </span>
          <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => validateAge(e)} value={age} required />
          {ageError ? <ErrorMessage message={"MUST BE 18 OR OLDER"} /> : ""}

          <span className="label">
            <label htmlFor="email">Email:</label>
          </span>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          {emailError ? <ErrorMessage message={"E-MAIL IS NOT VALID"} /> : ""}

          <span className="label">
            <label htmlFor="tel">Phone:</label>
          </span>
          <input type="tel" name="tel" id="tel" onChange={(e) => handlePhoneNumberInput(e)} value={phoneNumber} required />
          {phoneError ? <ErrorMessage message={"PHONE NUMBER IS NOT VALID"} /> : ""}

          <span className="label">
            <label htmlFor="tattooStyle">Tattoo Style:</label>
          </span>
          <select name="tattooStyle" id="tattooStyle" onChange={(e) => setTattooStyle(e.target.value)} value={tattooStyle} required>
            <option value="select" disabled>
              --- Select Style ---
            </option>
            <option value="Linework">Linework</option>
            <option value="Black & White">Black & White</option>
            <option value="Full Color">Full Color</option>
            <option value="Lettering">Lettering</option>
          </select>
          {tattooStyleError ? <ErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} /> : ""}

          <span className="label">
            <label htmlFor="tattooPlacement">Tattoo Placement:</label>
          </span>
          <input type="text" name="tattooPlacement" id="tattooPlacement" maxLength={30} onChange={(e) => validateTattooPlacement(e)} value={tattooPlacement} required />
          {tattooPlacementError ? <ErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} /> : ""}

          <div className="photo-upload">REFERENCE PHOTO UPLOAD HERE</div>
          <div className="photo-upload">PLACEMENT PHOTO UPLOAD HERE</div>

          <span className="label">
            <label htmlFor="tattooDescription">Tattoo Description:</label>
          </span>
          <textarea name="tattooDescription" id="tattooDescription" onChange={(e) => validateTattooDescription(e)} value={tattooDescription} minLength={7} required />
          {tattooDescriptionError ? <ErrorMessage message={"DESCRIPTION MUST BE AT LEAST 7 CHARACHTERS"} /> : ""}

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
