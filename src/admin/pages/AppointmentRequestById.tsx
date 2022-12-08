import AdminPage from "admin/components/AdminPage";
import ActionContextProvider from "admin/context/ActionContetProvider";
import RequestActions from "admin/features/RequestActions/RequestActions";
import { fetchPhotoUrls, getRequest } from "admin/services/AdminApiService";
import FetchError from "components/errors/FetchError";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import useLocationRoute from "hooks/useLocationRoute";
import useSWR from "swr";
import * as RequestSection from "../features/RequestSection";
import "./AppointmentRequestById.css";

function AppointmentRequestById() {
  const { route, id, title } = useLocationRoute();

  const { data: request, error: requestError } = useSWR(`appointment-requests/${route}/${id}`, getRequest, {
    revalidateOnFocus: false,
  });
  const { data: photos } = useSWR(() => request, fetchPhotoUrls, { revalidateOnFocus: false });

  if (requestError) return <FetchError fetchError={requestError} />;
  if (!request) return <LoadingDotsIcon />;
  return (
    <AdminPage title={`${title} Request`}>
      <div className="AppointmentRequestById">
        <h2>{title} Request</h2>
        <RequestSection.RequestDetails request={request} />
        <RequestSection.CustomerDetails request={request} />
        <RequestSection.TattooDetails request={request} photos={photos} />
        <RequestSection.HistoryLog request={request} />
      </div>

      <ActionContextProvider>
        <RequestActions request={request} />
      </ActionContextProvider>
    </AdminPage>
  );
}

export default AppointmentRequestById;
