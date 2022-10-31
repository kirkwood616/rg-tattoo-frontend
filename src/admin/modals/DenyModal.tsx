import AddNote from "admin/features/AddNote/AddNote";
import { denyRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DenyModal.css";

interface Props {
  isDenyActive: boolean;
  setIsDenyActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function DenyModal({ isDenyActive, setIsDenyActive, request }: Props) {
  const [deniedReason, setDeniedReason] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onDeny() {
    setIsSubmitActive((current) => !current);
  }

  async function handleDeny() {
    toggleLoading();
    try {
      let deniedRequest: AppointmentRequest = {
        ...request,
        requestStatus: "denied",
        deniedMessage: deniedReason,
        isRequestClosed: true,
        historyLog: [...request.historyLog],
      };
      if (newNote.length > 0) {
        deniedRequest.historyLog = [
          ...request.historyLog,
          { dateCreated: new Date(), action: "Request Denied.", note: newNote },
        ];
      } else {
        deniedRequest.historyLog = [...request.historyLog, { dateCreated: new Date(), action: "Request Denied." }];
      }
      await denyRequest(deniedRequest);
      setIsDenyActive((current) => !current);
      navigate("/admin/appointment-requests");
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <ModalWindow isActive={isDenyActive} setIsActive={setIsDenyActive} className="deny-info">
      <p>Please provide a reason for denying this request.</p>
      <p>* This message will appear in the client's denied notification email. *</p>
      <textarea
        id="denyReason"
        name="denyReason"
        className="deny-textarea"
        value={deniedReason}
        onChange={(e) => setDeniedReason(e.target.value)}
      />
      <AddNote request={request} note={newNote} setNote={setNewNote} />
      <GoButton type="button" text="DENY" backgroundColor="green" onClick={onDeny} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsDenyActive(false)} />

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleDeny}
          yesButtonText={"SUBMIT"}
        />
      )}
    </ModalWindow>
  );
}

export default DenyModal;
