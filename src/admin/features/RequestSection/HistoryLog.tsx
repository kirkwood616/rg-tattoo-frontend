import { adminLocaleTZ } from "admin/settings/AdminSettings";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useState } from "react";
import { formatISODateTime } from "utils/Formatting";
import AddNote from "../AddNote/AddNote";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
}

function HistoryLog({ request }: Props) {
  const [note, setNote] = useState("");

  return (
    <RequestSection title="HISTORY LOG">
      {request.historyLog.map((item, index) => (
        <div className="items_container" key={String(item.dateCreated) + index}>
          <div className="request-item_title">{formatISODateTime(item.dateCreated, adminLocaleTZ)}</div>
          <div className="request-item_info">
            {item.action && (
              <div className="log_container action_container">
                <div className="action_title">ACTION</div>
                <div className="action_text">{item.action}</div>
              </div>
            )}
            {item.note && (
              <div className="log_container note_container">
                <div className="note_title">NOTE</div>
                <div className="note_text">{item.note}</div>
              </div>
            )}
          </div>
        </div>
      ))}

      <AddNote request={request} note={note} setNote={setNote} />
    </RequestSection>
  );
}

export default HistoryLog;
