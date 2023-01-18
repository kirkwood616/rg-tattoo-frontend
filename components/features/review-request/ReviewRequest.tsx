/* eslint-disable @next/next/no-img-element */
import GoButton from "components/ui/buttons/GoButton";
import InfoSection from "components/ui/info-section/InfoSection";
import ModalWindow from "components/ui/modals/ModalWindow";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { postAppointmentRequest } from "services/AppointmentService";
import { toggleBooleanState } from "src/utils/Toggle";
import styles from "styles/features/ReviewRequest.module.css";
import { formatTimeNoLeadingZero } from "utils/Formatting";
import { handlePhotoUpload, readFileSetState } from "utils/PhotoUpload";
import { generateNewRequest } from "utils/Request";

interface ReviewRequestProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewRequest({ setIsActive }: ReviewRequestProps) {
  const [referenceData, setReferenceData] = useState<string | ArrayBuffer | null>(null);
  const [placementData, setPlacementData] = useState<string | ArrayBuffer | null>(null);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);
  const [countSubmit, setCountSubmit] = useState<number>(0);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { state } = useContext(RequestContext);
  const router = useRouter();

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
    setCountSubmit((prev) => prev + 1);
    if (!isCaptchaChecked || !captchaRef.current?.getValue()) {
      console.error("ReCAPTCHA Error: No Token");
      return;
    }
    const token = captchaRef.current.getValue();
    toggleLoading();
    const newRequest = generateNewRequest(state);
    try {
      await postAppointmentRequest(newRequest, token!);
      await handlePhotoUpload(state, "reference");
      if (state.placementPhoto.value) {
        await handlePhotoUpload(state, "placement");
      }
      captchaRef.current.reset();
      toggleBooleanState(setIsActive);
      router.push("/request-submitted");
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  function handleClose() {
    toggleBooleanState(setIsActive);
  }

  return (
    <ModalWindow closeFunction={handleClose}>
      <div className={styles.ReviewRequest}>
        <h1>REVIEW REQUEST</h1>
        <InfoSection title={"REQUEST DATE"} body={`${format(state.startDate.value!, "MM/dd/yyyy")}`} />
        <InfoSection title={"REQUEST TIME"} body={formatTimeNoLeadingZero(state.appointmentTime.value)} />
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
        <div
          className={`${styles.recaptcha__container} ${
            isCaptchaChecked ? styles.recaptcha__checked : styles.recaptcha__unchecked
          } ${countSubmit > 0 && !isCaptchaChecked && styles.recaptcha__unchecked_error}`}
        >
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
            ref={captchaRef}
            onChange={() => setIsCaptchaChecked((current) => !current)}
            size="compact"
          />
        </div>
        <GoButton text="SUBMIT" cssClass="button__primary" isDisabled={!isCaptchaChecked} onClick={handleSubmit} />
        <GoButton text="CANCEL" cssClass="button__cancel" onClick={handleClose} />
      </div>
    </ModalWindow>
  );
}

export default ReviewRequest;
