import { Dispatch, SetStateAction } from "react";
import AppointmentRequest from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import "./ApproveModal.css";

interface Props {
  isApproveActive: boolean;
  setIsApproveActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function ApproveModal({ isApproveActive, setIsApproveActive, request }: Props) {
  // APPROVE
  function onApprove(): void {
    let approvedRequest: AppointmentRequest = {
      ...request,
      isRequestApproved: true,
    };
    console.log(approvedRequest);
    setIsApproveActive(false);
  }

  return (
    <div className={isApproveActive ? "ApproveModal" : "ApproveModal hide"}>
      <div className="approve-confirm">
        <h2>Are You Sure?</h2>
        <GoButton type="button" text="APPROVE REQUEST" backgroundColor="green" onClick={onApprove} />
        <GoButton type="button" text="CANCEL" backgroundColor="red" onClick={() => setIsApproveActive(false)} />
      </div>
    </div>
  );
}

export default ApproveModal;
