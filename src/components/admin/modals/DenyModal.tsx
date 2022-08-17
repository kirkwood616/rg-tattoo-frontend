import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminContext from "../../../context/AdminContext";
import AppContext from "../../../context/AppContext";
import { AppointmentRequest } from "../../../models/AppointmentRequest";
import { denyAppointmentRequest } from "../../../services/AdminApiService";
import GoButton from "../../buttons/GoButton";
import ModalWindow from "../../modals/ModalWindow";
import "./DenyModal.css";

interface Props {
  isDenyActive: boolean;
  setIsDenyActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function DenyModal({ isDenyActive, setIsDenyActive, request }: Props) {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);
  const { handleAppointmentRequests } = useContext(AdminContext);

  // NAVIGATE
  const navigate = useNavigate();

  // STATE
  const [deniedReason, setDeniedReason] = useState<string>("");

  // DENY
  function onDeny(): void {
    const deniedRequest: AppointmentRequest = {
      ...request,
      requestStatus: "denied",
      deniedMessage: deniedReason,
      isRequestClosed: true,
      historyLog: [...request.historyLog, { dateCreated: new Date(), note: "Request Denied." }],
    };
    if (!deniedRequest._id) return;
    setIsLoading(true);
    denyAppointmentRequest(deniedRequest._id, deniedRequest)
      .then(() => handleAppointmentRequests())
      .catch((error) => console.error(error))
      .then(() => {
        setDeniedReason("");
        setIsLoading(false);
        setIsDenyActive(false);
      })
      .then(() => navigate("/admin/appointment-requests"));
  }

  // CANCEL
  function onCancel(): void {
    setDeniedReason("");
    setIsDenyActive(false);
  }

  return (
    <ModalWindow isActive={isDenyActive} setIsActive={setIsDenyActive} className="deny-info">
      Please provide a reason for denying this request. <br /> <br />
      <textarea id="denyReason" name="denyReason" className="deny-textarea" value={deniedReason} onChange={(e) => setDeniedReason(e.target.value)} />
      <GoButton type="button" text="DENY" backgroundColor="green" onClick={onDeny} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={onCancel} />
    </ModalWindow>
  );
}

export default DenyModal;
