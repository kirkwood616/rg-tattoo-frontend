import { Outlet } from "react-router-dom";
import useLocationRoute from "./hooks/useLocationRoute";
import RequestListByStatus from "./RequestListByStatus";

function RequestList() {
  const { id } = useLocationRoute();

  return <>{id ? <Outlet /> : <RequestListByStatus />}</>;
}

export default RequestList;
