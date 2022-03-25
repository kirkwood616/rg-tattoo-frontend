import "./RequestAppointment.css";
import Page from "./Page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FormEvent, useContext, useEffect, useState } from "react";
import AppointmentRequest from "../models/AppointmentRequest";
import ErrorMessage from "./ErrorMessage";
import { validateEmail, validateAge, validateName, validatePhone, validateTattooPlacement, validateTattooDescription } from "../functions/Validation";
import { postAppointmentRequest } from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import GoButton from "./buttons/GoButton";
import AppContext from "../context/AppContext";
import AvailableAppointments from "../models/AvailableAppointments";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebaseConfig";

function RequestAppointment() {
  // CONTEXT
  let { availableAppointments } = useContext(AppContext);

  // NAVIGATE
  let navigate = useNavigate();

  // STATES FOR DATES
  const [maxAppointmentDate, setMaxAppointmentDate] = useState<Date>();
  const [excludedDates, setExcludedDates] = useState<Date[]>([]);

  // STATES FOR FORM
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [availableAppointmentTimes, setAvailableAppointmentsTimes] = useState<string[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<string>("select");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(18);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [tattooStyle, setTattooStyle] = useState<string>("select");
  const [tattooPlacement, setTattooPlacement] = useState<string>("");
  const [tattooDescription, setTattooDescription] = useState<string>("");
  const [ofAgeConfirm, setOfAgeConfirm] = useState<boolean>(false);

  // STATES FOR FILES
  const [referenceImage, setReferenceImage] = useState<File | null>(null);

  // STATES FOR ERRORS
  const [submitCount, setSubmitCount] = useState<number>(0);
  const [errors, setErrors] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<boolean>(false);
  const [appointmentTimeError, setAppointmentTimeError] = useState<boolean>(false);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [tattooStyleError, setTattooStyleError] = useState<boolean>(false);
  const [tattooPlacementError, setTattooPlacementError] = useState<boolean>(false);
  const [tattooDescriptionError, setTattooDescriptionError] = useState<boolean>(false);

  // FILE UPLOAD
  function handleReferencePhotoChange(e: any): void {
    if (e.target.files[0]) {
      setReferenceImage(e.target.files[0]);
    }
  }

  function handleReferencePhotoUpload(): void {
    if (!referenceImage) return;
    const storageRef = ref(storage, `/images/${firstName}-${lastName}-${referenceImage.name}`);
    uploadBytesResumable(storageRef, referenceImage);
  }

  // CHECK FOR DATE IN DATABASE
  useEffect(() => {
    if (!startDate) return;

    let dateInDatabase: AvailableAppointments | undefined = availableAppointments.find((date) => date.date === format(startDate!, "MM-dd-yyyy"));

    if (dateInDatabase) {
      setAppointmentTime("select");
      setAvailableAppointmentsTimes(dateInDatabase.availableTimes);
    } else {
      setAvailableAppointmentsTimes([]);
      setAppointmentTime("select");
    }
  }, [availableAppointments, startDate]);

  // ERRORS
  useEffect(() => {
    if (startDateError || firstNameError || lastNameError || ageError || emailError || phoneError || tattooStyleError || tattooPlacementError || tattooDescriptionError) {
      setErrors(true);
    } else {
      setErrors(false);
    }
  }, [ageError, emailError, firstNameError, lastNameError, phoneError, startDateError, tattooDescriptionError, tattooPlacementError, tattooStyleError]);

  useEffect(() => {
    if (submitCount > 0) {
      if (startDate) setStartDateError(false);
      if (!startDate) setStartDateError(true);
      if (appointmentTime === "select" || null) setAppointmentTimeError(true);
      if (appointmentTime !== "select") setAppointmentTimeError(false);
      if (!firstName) setFirstNameError(true);
      if (!lastName) setLastNameError(true);
      if (!email) setEmailError(true);
      if (!phoneNumber) setPhoneError(true);
      if (tattooStyle === "select") setTattooStyleError(true);
      if (!tattooPlacement) setTattooPlacementError(true);
      if (!tattooDescription) setTattooDescriptionError(true);
    }
  }, [submitCount, firstName, lastName, email, phoneNumber, tattooStyle, tattooPlacement, tattooDescription, startDate, appointmentTime]);

  // E-MAIL ERRORS
  useEffect(() => {
    if (email) {
      const delay = setTimeout(() => validateEmail(email, setEmailError), 800);
      return () => clearTimeout(delay);
    }
  }, [email]);

  // PHONE # ERRORS
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

  // TATTOO STYLE ERRORS
  useEffect(() => {
    if (tattooStyle !== "select") setTattooStyleError(false);
  }, [tattooStyle]);

  // HANDLE SUBMIT
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (tattooStyle === "select") {
      setTattooStyleError(true);
      return;
    }
    if (appointmentTime === "select") {
      setAppointmentTimeError(true);
      return;
    }
    if (errors) {
      return;
    } else {
      let newRequest: AppointmentRequest = {
        requestSubmittedDate: new Date(),
        requestDateTime: new Date(appointmentTime),
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email.toLowerCase(),
        phoneNumber: phoneNumber,
        tattooStyle: tattooStyle,
        tattooPlacement: tattooPlacement,
        referencePhotoPath: referenceImage ? `${firstName!}-${lastName!}-${referenceImage!.name}` : "",
        placementPhotoPath: "",
        tattooDescription: tattooDescription,
        isRequestApproved: false,
        isRequestDenied: false,
      };
      handleReferencePhotoUpload(); // reference photo upload
      postAppointmentRequest(newRequest);
      navigate("/request-submitted");
    }
  }

  // DIABLE OFF-DAYS OF SUNDAY & MONDAYS ON CALENDAR
  function disableSundayMonday(date: Date): boolean {
    return date.getDay() !== 0 && date.getDay() !== 1;
  }

  // RENDER
  return (
    <Page title="Request Appointment">
      <div className="RequestAppointment">
        <h1>Request Appointment</h1>
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
              autoComplete="off"
              required
            />
            {startDateError ? <ErrorMessage message={"Date Required"} /> : ""}
          </div>

          {startDate ? (
            <div className="apt-times-container">
              <span className="label">
                <label htmlFor="aptTimes">Available Times:</label>
              </span>
              {availableAppointmentTimes.length ? (
                <select name="aptTimes" id="aptTimes" onChange={(e) => setAppointmentTime(e.target.value)} value={appointmentTime} required>
                  <option value="select" disabled>
                    --- Select Time ---
                  </option>
                  {availableAppointmentTimes!.map((time, i) => (
                    <option key={i} value={String(time)}>
                      {format(new Date(time), "h:mm a")}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="no-available-appointments">No Available Appointments</div>
              )}
              {appointmentTimeError ? <ErrorMessage message={"SELECT A TIME"} /> : ""}
            </div>
          ) : (
            ""
          )}

          <span className="label">
            <label htmlFor="firstName">First Name:</label>
          </span>
          <input type="text" name="firstName" id="firstName" onChange={(e) => validateName(e, setFirstName, setFirstNameError)} value={firstName} required />
          {firstNameError ? <ErrorMessage message={"FIRST NAME REQUIRED"} /> : ""}

          <span className="label">
            <label htmlFor="lastName">Last Name:</label>
          </span>
          <input type="text" name="lastName" id="lastName" onChange={(e) => validateName(e, setLastName, setLastNameError)} value={lastName} required />
          {lastNameError ? <ErrorMessage message={"LAST NAME REQUIRED"} /> : ""}

          <span className="label">
            <label htmlFor="age">Age:</label>
          </span>
          <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => validateAge(e, setAge, setAgeError)} value={age} required />
          {ageError ? <ErrorMessage message={"MUST BE 18 OR OLDER"} /> : ""}

          <span className="label">
            <label htmlFor="email">Email:</label>
          </span>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          {emailError ? <ErrorMessage message={"E-MAIL IS NOT VALID"} /> : ""}

          <span className="label">
            <label htmlFor="tel">Phone:</label>
          </span>
          <input type="tel" name="tel" id="tel" onChange={(e) => validatePhone(e, setPhoneNumber)} value={phoneNumber} required />
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
          <input
            type="text"
            name="tattooPlacement"
            id="tattooPlacement"
            maxLength={30}
            onChange={(e) => validateTattooPlacement(e, setTattooPlacement, setTattooPlacementError)}
            value={tattooPlacement}
            required
          />
          {tattooPlacementError ? <ErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} /> : ""}

          <div className="photo-upload">
            <input type="file" name="referencePhoto" id="referencePhoto" accept="image/*" onChange={handleReferencePhotoChange} />
          </div>
          <div className="photo-upload">PLACEMENT PHOTO UPLOAD HERE</div>

          <span className="label">
            <label htmlFor="tattooDescription">Tattoo Description:</label>
          </span>
          <textarea
            name="tattooDescription"
            id="tattooDescription"
            onChange={(e) => validateTattooDescription(e, setTattooDescription, setTattooDescriptionError)}
            value={tattooDescription}
            minLength={7}
            required
          />
          {tattooDescriptionError ? <ErrorMessage message={"DESCRIPTION MUST BE AT LEAST 7 CHARACTERS"} /> : ""}

          <div className="of-age-confirm">
            <input type="checkbox" name="ofAgeConfirm" id="ofAgeConfirm" onChange={() => setOfAgeConfirm(!ofAgeConfirm)} />
            <label htmlFor="ofAgeConfirm">I confirm that I am or will be 18 years of age by the date of this requested appointment.</label>
          </div>
          <GoButton type="submit" text="Submit Request" onClick={() => setSubmitCount(submitCount + 1)} />
        </form>
      </div>
    </Page>
  );
}

export default RequestAppointment;
