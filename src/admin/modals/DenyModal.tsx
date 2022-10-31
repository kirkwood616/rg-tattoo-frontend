import AddNote from "admin/features/AddNote/AddNote";
import { denyRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
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
  const [deniedReason, setDeniedReason] = useState<string>("");
  const [newNote, setNewNote] = useState("");

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onDeny(): void {
    let deniedRequest: AppointmentRequest;
    if (newNote.length > 0) {
      deniedRequest = {
        ...request,
        requestStatus: "denied",
        deniedMessage: deniedReason,
        isRequestClosed: true,
        historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Request Denied.", note: newNote }],
      };
    } else {
      deniedRequest = {
        ...request,
        requestStatus: "denied",
        deniedMessage: deniedReason,
        isRequestClosed: true,
        historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Request Denied." }],
      };
    }
    toggleLoading();
    denyRequest(deniedRequest)
      .catch((error) => console.error(error))
      .then(() => {
        toggleLoading();
        setIsDenyActive(false);
        navigate("/admin/appointment-requests");
      });
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
    </ModalWindow>
  );
}

export default DenyModal;
