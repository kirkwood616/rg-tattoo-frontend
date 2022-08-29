import { Dispatch, SetStateAction, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";
import { AppointmentRequest } from "../../../models/AppointmentRequest";
import { approveNewRequest } from "../../../services/AdminApiService";
import GoButton from "../../buttons/GoButton";
import ModalWindow from "../../modals/ModalWindow";
import "./ApproveModal.css";

interface Props {
  isApproveActive: boolean;
  setIsApproveActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function ApproveModal({ isApproveActive, setIsApproveActive, request }: Props) {
  // CONTEXT
  const { setIsLoading } = useContext(AppContext);

  // NAVIGATE
  const navigate = useNavigate();

  // APPROVE
  function onApprove(): void {
    const approvedRequest: AppointmentRequest = {
      ...request,
      requestStatus: "awaiting-deposit",
      historyLog: [...request.historyLog, { dateCreated: new Date(), action: "Request Approved. Awaiting Deposit." }],
    };
    if (!approvedRequest._id) return;
    setIsLoading(true);
    approveNewRequest(approvedRequest).then(() => {
      setIsLoading(false);
      setIsApproveActive(false);
      navigate("/admin/appointment-requests");
    });
  }

  return (
    <ModalWindow isActive={isApproveActive} setIsActive={setIsApproveActive} className="approve-confirm">
      <h2>Are You Sure?</h2>
      <GoButton type="button" text="APPROVE REQUEST" backgroundColor="green" onClick={onApprove} />
      <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsApproveActive(false)} />
    </ModalWindow>
  );
}

export default ApproveModal;
