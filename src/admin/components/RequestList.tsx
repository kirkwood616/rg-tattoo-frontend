import RequestListByStatus from "admin/pages/RequestListByStatus";
import useLocationRoute from "hooks/useLocationRoute";
import { Outlet } from "react-router-dom";

function RequestList() {
  const { id } = useLocationRoute();

  return <>{id ? <Outlet /> : <RequestListByStatus />}</>;
}

export default RequestList;
