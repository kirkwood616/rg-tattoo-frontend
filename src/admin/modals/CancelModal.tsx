import AddNote from "admin/features/AddNote/AddNote";
import { sendCanceledRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  request: AppointmentRequest;
  isCancelActive: boolean;
  setIsCancelActive: Dispatch<SetStateAction<boolean>>;
}

function CancelModal({ request, isCancelActive, setIsCancelActive }: Props) {
  const [newNote, setNewNote] = useState("");

  const { toggleLoading } = useContext(AppContext);
  const navigate = useNavigate();

  function onCancel(): void {
    let canceledRequest: AppointmentRequest;
    if (newNote.length) {
      canceledRequest = {
        ...request,
        requestStatus: "canceled",
        historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Canceled.", note: newNote }],
      };
    } else {
      canceledRequest = {
        ...request,
        requestStatus: "canceled",
        historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Appointment Canceled." }],
      };
    }
    toggleLoading();
    sendCanceledRequest(canceledRequest)
      .catch((error) => console.error(error))
      .then(() => {
        toggleLoading();
        setIsCancelActive((current) => !current);
        navigate("/admin/appointment-requests");
      });
  }

  return (
    <ModalWindow isActive={isCancelActive} setIsActive={setIsCancelActive} className="cancel-confirm">
      <label htmlFor="">Please enter a reason the appointment was cancelled</label>
      <textarea name="cancel-reason" id="cancel-reason" />
      <p>* This message will be sent to the client in a notification email *</p>
      <AddNote request={request} note={newNote} setNote={setNewNote} />
      <GoButton type="button" text="SUBMIT" backgroundColor="green" onClick={onCancel} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsCancelActive((current) => !current)} />
    </ModalWindow>
  );
}

export default CancelModal;
