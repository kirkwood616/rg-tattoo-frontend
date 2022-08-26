import { Outlet } from "react-router-dom";
import useLocationRoute from "./hooks/useLocationRoute";
import RequestListByStatus from "./RequestListByStatus";

function RequestList() {
  // LOCATION
  const { params } = useLocationRoute();

  return (
    <>
      {params.id && <Outlet />}
      {!params.id && <RequestListByStatus />}
    </>
  );
}

export default RequestList;
