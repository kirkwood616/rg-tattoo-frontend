import { Dispatch, SetStateAction, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AppointmentRequest from "../../models/AppointmentRequest";
import { updateAppointmentRequest } from "../../services/AdminApiService";
import GoButton from "../buttons/GoButton";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import "./ApproveModal.css";

interface Props {
  isApproveActive: boolean;
  setIsApproveActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function ApproveModal({ isApproveActive, setIsApproveActive, request }: Props) {
  // CONTEXT
  let { handleAppointmentRequests } = useContext(AppContext);

  // STATE
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // APPROVE
  function onApprove(): void {
    let approvedRequest: AppointmentRequest = {
      ...request,
      isRequestApproved: true,
    };
    if (!approvedRequest._id) return;
    setIsLoading(true);
    updateAppointmentRequest(approvedRequest._id, approvedRequest)
      .then(() => handleAppointmentRequests())
      .then(() => {
        setIsLoading(false);
        setIsApproveActive(false);
      });
  }

  return (
    <div className={isApproveActive ? "ApproveModal" : "ApproveModal hide"}>
      <div className="approve-confirm">
        <h2>Are You Sure?</h2>
        <GoButton type="button" text="APPROVE REQUEST" backgroundColor="green" onClick={onApprove} />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsApproveActive(false)} />
        {isLoading ? <LoadingDotsIcon /> : ""}
      </div>
    </div>
  );
}

export default ApproveModal;
