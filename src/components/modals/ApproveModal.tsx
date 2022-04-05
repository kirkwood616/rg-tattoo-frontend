import { Dispatch, SetStateAction, useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AppointmentRequest from "../../models/AppointmentRequest";
import { updateAppointmentRequest } from "../../services/AdminApiService";
import GoButton from "../buttons/GoButton";
import "./ApproveModal.css";

interface Props {
  isApproveActive: boolean;
  setIsApproveActive: Dispatch<SetStateAction<boolean>>;
  request: AppointmentRequest;
}

function ApproveModal({ isApproveActive, setIsApproveActive, request }: Props) {
  // CONTEXT
  let { handleAppointmentRequests, setIsLoading } = useContext(AppContext);

  // NAVIGATE
  const navigate: NavigateFunction = useNavigate();

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
        navigate("/admin/appointment-requests");
      });
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
