import useLocationRoute from "admin/hooks/useLocationRoute";
import RequestListByStatus from "admin/pages/RequestListByStatus";
import { Outlet } from "react-router-dom";

function RequestList() {
  const { id } = useLocationRoute();

  return <>{id ? <Outlet /> : <RequestListByStatus />}</>;
}

export default RequestList;
