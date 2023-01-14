import GoButton from "components/ui/buttons/GoButton";
import InfoSection from "components/ui/info-section/InfoSection";
import ModalWindow from "components/ui/modals/ModalWindow";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { postAppointmentRequest } from "services/AppointmentService";
import { toggleBooleanState } from "src/utils/Toggle";
import styles from "styles/features/ReviewRequest.module.css";
import { handlePhotoUpload, readFileSetState } from "utils/PhotoUpload";
import { generateNewRequest } from "utils/Request";

interface ReviewRequestProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReviewRequest({ setIsActive }: ReviewRequestProps) {
  const [referenceData, setReferenceData] = useState<string | ArrayBuffer | null>(null);
  const [placementData, setPlacementData] = useState<string | ArrayBuffer | null>(null);
  const [isCaptchaChecked, setIsCaptchaChecked] = useState<boolean>(false);
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
    const token = captchaRef.current?.getValue();
    if (!token) {
      console.log("captcha error");
      return;
    }
    toggleLoading();
    const newRequest = generateNewRequest(state);
    try {
      await postAppointmentRequest(newRequest, token);
      await handlePhotoUpload(state, "reference");
      if (state.placementPhoto.value) {
        await handlePhotoUpload(state, "placement");
      }
      captchaRef.current?.reset();
      toggleBooleanState(setIsActive);
      router.push("/request-submitted");
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
    <ModalWindow closeFunction={handleClose}>
      <div className={styles.ReviewRequest}>
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
        <InfoSection
          title={"REFERENCE PHOTO"}
          body={<Image src={referenceData!.toString()} alt="reference" height={200} width={200} />}
        />
        {state.placementPhoto.value && (
          <InfoSection
            title={"REFERENCE PHOTO"}
            body={<Image src={placementData!.toString()} alt="placement" height={200} width={200} />}
          />
        )}
        <InfoSection title={"TATTOO DESCRIPTION"} body={state.tattooDescription.value} />
        <div className={styles.recaptcha__container}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY || ""}
            ref={captchaRef}
            onChange={() => setIsCaptchaChecked((current) => !current)}
          />
        </div>
        <GoButton text="SUBMIT" cssClass="button__primary" isDisabled={!isCaptchaChecked} onClick={handleSubmit} />
        <GoButton text="CANCEL" cssClass="button__cancel" onClick={handleClose} />
      </div>
    </ModalWindow>
  );
}

export default ReviewRequest;
