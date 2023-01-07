import { updateClosedRequest, updateOpenRequest } from "admin/services/AdminApiService";
import GoButton from "components/buttons/GoButton";
import AreYouSure from "components/modals/AreYouSure";
import ModalWindow from "components/modals/ModalWindow";
import AppContext from "context/AppContext";
import useLocationRoute from "hooks/useLocationRoute";
import { AppointmentRequest } from "models/AppointmentRequest";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useSWRConfig } from "swr";
import { toggleBooleanState } from "utils/Toggle";
import "./AddNote.css";

interface Props {
  request: AppointmentRequest;
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
}

function AddNote({ request, note, setNote }: Props) {
  const [isNoteActive, setIsNoteActive] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);

  const { toggleLoading, toggleModalOpen } = useContext(AppContext);
  const { route, id } = useLocationRoute();
  const { mutate } = useSWRConfig();

  function onToggleNote(): void {
    toggleModalOpen(setIsNoteActive);
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

  function onSaveNote() {
    if (note.length) setIsSubmitActive((current) => !current);
    else return;
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
      toggleBooleanState(setIsSubmitActive);
      setNote("");
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  }

  return (
    <>
      <div className="AddNote">
        <GoButton text="ADD NOTE" onClick={onToggleNote} />
      </div>

      {isNoteActive && (
        <ModalWindow isActive={isNoteActive} closeFunction={onToggleNote}>
          <h1>ADD NOTE</h1>
          <div className="note-field">
            <textarea
              name="note"
              id="note"
              className="note"
              value={note}
              placeholder="Enter a note for yourself..."
              onChange={(e) => setNote(e.target.value)}
            />

            <p>* Notes are only visible to you. Clients will not see your notes *</p>

            <GoButton text="SAVE NOTE" cssClass="button_primary" isDisabled={note.length < 1} onClick={onSaveNote} />

            <GoButton text={"CANCEL NOTE"} cssClass="button_cancel" onClick={onToggleNote} />
          </div>
        </ModalWindow>
      )}

      {isSubmitActive && (
        <AreYouSure
          isActive={isSubmitActive}
          setIsActive={setIsSubmitActive}
          yesFunction={handleSaveNote}
          yesButtonText="YES"
          subModal
        />
      )}
    </>
  );
}

export default AddNote;
