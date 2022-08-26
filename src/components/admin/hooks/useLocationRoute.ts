import { useLocation, useParams } from "react-router-dom";
import { RequestStatus } from "../../../models/AppointmentRequest";
import { formatTitle } from "../../../utils/Formatting";

export default function useLocationRoute() {
  const location = useLocation();
  const params = useParams();
  const route: RequestStatus = params.route as RequestStatus;
  const id = params.id;
  const title: string = formatTitle(route);

  return { location, params, route, id, title };
}
