import { adminLocaleTZ } from "admin/settings/AdminSettings";
import InfoSection from "components/InfoSection/InfoSection";
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
        <InfoSection
          key={index + String(item.dateCreated)}
          title={formatISODateTime(item.dateCreated, adminLocaleTZ)}
          body={
            <>
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
            </>
          }
        />
      ))}

      <AddNote request={request} note={note} setNote={setNote} />
    </RequestSection>
  );
}

export default HistoryLog;
