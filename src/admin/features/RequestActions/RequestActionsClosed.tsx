import AddNote from "admin/features/AddNote/AddNote";
import { AppointmentRequest } from "models/AppointmentRequest";
import { useState } from "react";

interface Props {
  request: AppointmentRequest;
}

function ClosedRequestActions({ request }: Props) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [note, setNote] = useState("");

  return (
    <>
      <AddNote request={request} note={note} setNote={setNote} />
    </>
  );
}

export default ClosedRequestActions;
