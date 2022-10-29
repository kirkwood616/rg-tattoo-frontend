import useLocationRoute from "admin/hooks/useLocationRoute";
import { putClosedRequest } from "admin/services/AdminApiService";
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
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const { route, id } = useLocationRoute();

  const { toggleLoading } = useContext(AppContext);
  const { mutate } = useSWRConfig();

  function onToggleNote() {
    setIsNoteActive((current) => !current);
    if (note.length > 0) setNote("");
  }

  function onSaveNote() {
    if (note.length === 0) return;
    setIsNoteSaved((current) => !current);
    setIsNoteActive((current) => !current);
  }

  async function updateClosedWithNote() {
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

      await mutate(`appointment-requests/${route}/${id}`, putClosedRequest(updatedRequest), options);
      setNote("");
      setIsNoteActive((current) => !current);
      setIsNoteSaved((current) => !current);
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  function setSaveFunction() {
    switch (request.requestStatus) {
      case "completed":
      case "canceled":
      case "denied":
        return updateClosedWithNote();
      default:
        return onSaveNote();
    }
  }

  if (isNoteSaved)
    return (
      <>
        <p>{note}</p>
        <button
          onClick={() => {
            setIsNoteSaved((current) => !current);
            setIsNoteActive((current) => !current);
          }}
        >
          EDIT NOTE
        </button>
        <button
          onClick={() => {
            setNote("");
            setIsNoteSaved(false);
            setIsNoteActive(false);
          }}
        >
          DELETE NOTE
        </button>
      </>
    );
  return (
    <div className="AddNote" onClick={onToggleNote}>
      <p className="add-note">ADD NOTE</p>
      <div className={isNoteActive ? "note-field active" : "note-field inactive"} onClick={(e) => e.stopPropagation()}>
        <textarea name="note" id="note" className="note" value={note} onChange={(e) => setNote(e.target.value)} />

        <p>* Notes are only visible to you. Clients will not see your notes *</p>

        <GoButton type={"button"} text={"SAVE NOTE"} backgroundColor={"green"} onClick={setSaveFunction} />

        <GoButton type={"button"} text={"CANCEL NOTE"} backgroundColor={"red"} onClick={onToggleNote} />
      </div>
    </div>
  );
}

export default AddNote;
