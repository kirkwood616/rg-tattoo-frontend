import useLocationRoute from "admin/hooks/useLocationRoute";
import { updateClosedRequest, updateOpenRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import AppContext from "context/AppContext";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useSWRConfig } from "swr";
import "./AddNote.css";

interface Props {
  request: AppointmentRequest;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
}

function AddNote({ request, note, setNote }: Props) {
  const [isNoteActive, setIsNoteActive] = useState(false);

  const { toggleLoading } = useContext(AppContext);
  const { route, id } = useLocationRoute();
  const { mutate } = useSWRConfig();

  function onToggleNote(): void {
    setIsNoteActive((current) => !current);
    if (note.length > 0) setNote("");
  }

  function updateByRequestStatus(request: AppointmentRequest): Promise<any> {
    switch (request.requestStatus) {
      case "new":
      case "awaiting-deposit":
      case "deposit-received":
        return updateOpenRequest(request);
      default:
        return updateClosedRequest(request);
    }
  }

  async function handleSaveNote(): Promise<void> {
    if (!note.length) return;
    toggleLoading();
    try {
      const updatedRequest: AppointmentRequest = {
        ...request,
        historyLog: [...request.historyLog, { dateCreated: new Date(), note: note }],
      };

      const options = {
        optimisticData: updatedRequest,
        rollbackOnError: true,
      };

      await mutate(`appointment-requests/${route}/${id}`, updateByRequestStatus(updatedRequest), options);
      setNote("");
      setIsNoteActive((current) => !current);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <div className="AddNote" onClick={onToggleNote}>
      <div className="add-note">ADD NOTE</div>
      <div className={isNoteActive ? "note-field active" : "note-field inactive"} onClick={(e) => e.stopPropagation()}>
        <textarea name="note" id="note" className="note" value={note} onChange={(e) => setNote(e.target.value)} />

        <p>* Notes are only visible to you. Clients will not see your notes *</p>

        <GoButton
          type={"button"}
          text={"SAVE NOTE"}
          backgroundColor={note.length ? "green" : "var(--dark-gray-3)"}
          onClick={handleSaveNote}
        />

        <GoButton type={"button"} text={"CANCEL NOTE"} backgroundColor={"red"} onClick={onToggleNote} />
      </div>
    </div>
  );
}

export default AddNote;
