import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useSWRConfig } from "swr";
import AppContext from "../../context/AppContext";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import { putClosedRequest } from "../../services/AdminApiService";
import GoButton from "../buttons/GoButton";
import "./AddNote.css";
import useLocationRoute from "./hooks/useLocationRoute";

interface Props {
  request: AppointmentRequest;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
}

function AddNote({ request, note, setNote }: Props) {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);

  // STATE
  const [isNoteActive, setIsNoteActive] = useState(false);
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // LOCATION
  const { route, id } = useLocationRoute();

  // SWR
  const { mutate } = useSWRConfig();

  function onToggleNote() {
    setIsNoteActive((prev) => !prev);
    if (note.length > 0) setNote("");
  }

  function onSaveNote() {
    if (note.length === 0) return;
    setIsNoteSaved(true);
    setIsNoteActive((prev) => !prev);
  }

  async function updateClosedWithNote() {
    if (!note.length) return;
    setIsLoading((prev) => !prev);
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
    } catch (error) {
      console.error(error);
    }
    setIsLoading((prev) => !prev);
    setNote("");
    setIsNoteActive((prev) => !prev);
    setIsNoteSaved(false);
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
            setIsNoteSaved((prev) => !prev);
            setIsNoteActive((prev) => !prev);
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
