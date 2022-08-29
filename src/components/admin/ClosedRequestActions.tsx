import { useState } from "react";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import AddNote from "./AddNote";

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
