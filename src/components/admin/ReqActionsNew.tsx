import { useState } from "react";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import GoButton from "../buttons/GoButton";
import ApproveModal from "./modals/ApproveModal";
import DenyModal from "./modals/DenyModal";

interface Props {
  request: AppointmentRequest;
}

function ReqActionsNew({ request }: Props) {
  const [isApproveActive, setIsApproveActive] = useState(false);
  const [isDenyActive, setIsDenyActive] = useState(false);

  return (
    <>
      <GoButton type="button" text="APPROVE" backgroundColor="green" onClick={() => setIsApproveActive(true)} />
      <GoButton type="button" text="DENY" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
      {isApproveActive && <ApproveModal isApproveActive={isApproveActive} setIsApproveActive={setIsApproveActive} request={request} />}
      {isDenyActive && <DenyModal isDenyActive={isDenyActive} setIsDenyActive={setIsDenyActive} request={request} />}
    </>
  );
}

export default ReqActionsNew;
