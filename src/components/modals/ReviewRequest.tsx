import GoButton from "components/buttons/GoButton";
import InfoSection from "components/InfoSection/InfoSection";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { postAppointmentRequest } from "services/ApiService";
import { handlePhotoUpload, readFileSetState } from "utils/PhotoUpload";
import { generateNewRequest } from "utils/Request";
import ModalWindow from "./ModalWindow";
import "./ReviewRequest.css";

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewRequest({ isActive, setIsActive }: Props) {
  const [referenceData, setReferenceData] = useState<string | ArrayBuffer | null>(null);
  const [placementData, setPlacementData] = useState<string | ArrayBuffer | null>(null);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { state } = useContext(RequestContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.referencePhoto.value) {
      readFileSetState(state.referencePhoto.value, setReferenceData);
    }
    if (state.placementPhoto.value) {
      readFileSetState(state.referencePhoto.value, setPlacementData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(): Promise<void> {
    const token = captchaRef.current?.getValue();
    if (!token) {
      console.log("captcha error");
      return;
    }
    console.log(token);
    toggleLoading();
    const newRequest = generateNewRequest(state);
    try {
      await postAppointmentRequest(newRequest, token);
      await handlePhotoUpload(state, "reference");
      if (state.placementPhoto.value) {
        await handlePhotoUpload(state, "placement");
      }
      captchaRef.current?.reset();
      toggleModalOpen(setIsActive);
      navigate("/request-submitted");
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  function handleClose() {
    toggleModalOpen(setIsActive);
  }

  return (
    <ModalWindow isActive={isActive} closeFunction={handleClose}>
      <div className="ReviewRequest">
        <h1>REVIEW REQUEST</h1>
        <InfoSection
          title={"REQUEST DATE"}
          body={`${format(state.startDate.value!, "MM/dd/yyyy")} @ ${state.appointmentTime.value}`}
        />
        <InfoSection title={"NAME"} body={`${state.firstName.value} ${state.lastName.value}`} />
        <InfoSection title={"AGE"} body={state.age.value} />
        <InfoSection title={"EMAIL"} body={state.email.value} />
        <InfoSection title={"PHONE"} body={state.phoneNumber.value} />
        <InfoSection title={"TATTOO STYLE"} body={state.tattooStyle.value} />
        <InfoSection title={"TATTOO PLACEMENT"} body={state.tattooPlacement.value} />
        <InfoSection title={"BUDGET"} body={state.budget.value} />
        <InfoSection title={"REFERENCE PHOTO"} body={<img src={referenceData?.toString()} alt="reference" />} />
        {state.placementPhoto.value && (
          <InfoSection title={"REFERENCE PHOTO"} body={<img src={placementData?.toString()} alt="placement" />} />
        )}
        <InfoSection title={"TATTOO DESCRIPTION"} body={state.tattooDescription.value} />
        <div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
            ref={captchaRef}
            onChange={() => setIsCaptchaChecked((current) => !current)}
          />
        </div>
        <GoButton
          type="button"
          text="SUBMIT"
          backgroundColor={isCaptchaChecked ? "green" : "var(--dark-gray-3"}
          onClick={handleSubmit}
        />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={handleClose} />
      </div>
    </ModalWindow>
  );
}

export default ReviewRequest;
