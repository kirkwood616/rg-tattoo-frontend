import AdminPage from "admin/components/AdminPage";
import RequestActions from "admin/features/RequestActions/RequestActions";
import useLocationRoute from "admin/hooks/useLocationRoute";
import { fetchPhotoUrls, getRequest } from "admin/services/AdminApiService";
import LoadingDotsIcon from "components/loading/LoadingDotsIcon";
import useSWR from "swr";
import { formatEstTimeWithSuffix, formatRouteTitle, formatTimeNoLeadingZero, formatUnitedStatesDate } from "utils/Formatting";
import "./AppointmentRequestById.css";

function AppointmentRequestById() {
  // LOCATION
  const { route, id, title } = useLocationRoute();

  // SWR
  const { data: request, error: requestError } = useSWR(`appointment-requests/${route}/${id}`, getRequest, {
    revalidateOnFocus: false,
  });
  const { data: photos } = useSWR(() => request, fetchPhotoUrls, { revalidateOnFocus: false });

  // RENDER
  if (requestError) return <h1>Something went wrong!</h1>;
  if (!request) return <LoadingDotsIcon />;

  return (
    <AdminPage title={`${title} Request`}>
      <div className="AppointmentRequestById">
        <h2>{title} Request</h2>
        <section className="request-section_container">
          <div className="request-section_title">REQUEST DETAILS</div>
          <div className="request-item_title">REQUEST STATUS</div>
          <div className="request-item_info">{formatRouteTitle(request.requestStatus)}</div>
          <div className="request-item_title">REQUESTED DATE</div>
          <div className="request-item_info">{formatUnitedStatesDate(request.requestDate)}</div>
          <div className="request-item_title">REQUESTED TIME</div>
          <div className="request-item_info">{formatTimeNoLeadingZero(request.requestTime) + " (EST)"}</div>
          <div className="request-item_title">DATE SUBMITTED</div>
          <div className="request-item_info">
            {formatUnitedStatesDate(request.requestSubmittedDate)}
            <br />
            {formatEstTimeWithSuffix(request.requestSubmittedDate)}
          </div>

          {request.depositAmmountReceived > 0 && (
            <>
              <div className="request-item_title">DEPOSIT RECEIVED</div>
              <div className="request-item_info">${request.depositAmmountReceived}</div>
            </>
          )}
          {request.priceCharged > 0 && (
            <>
              <div className="request-item_title">PRICE CHARGED</div>
              <div className="request-item_info">${request.priceCharged}</div>
            </>
          )}
        </section>

        <section className="request-section_container">
          <div className="request-section_title">CUSTOMER DETAILS</div>
          <div className="request-item_title">NAME</div>
          <div className="request-item_info">{`${request.firstName} ${request.lastName}`}</div>
          <div className="request-item_title">AGE</div>
          <div className="request-item_info">{request.age}</div>
          <div className="request-item_title">EMAIL</div>
          <div className="request-item_info">
            <a href={`mailto: ${request.email}`}>{request.email}</a>
          </div>
          <div className="request-item_title">PHONE</div>
          <div className="request-item_info">{request.phoneNumber}</div>
        </section>

        <section className="request-section_container">
          <div className="request-section_title">DETAILS</div>
          <div className="request-item_title">STYLE</div>
          <div className="request-item_info">{request.tattooStyle}</div>
          <div className="request-item_title">PLACEMENT</div>
          <div className="request-item_info">{request.tattooPlacement}</div>
          <div className="request-item_title">DESCRIPTION</div>
          <div className="request-item_info" style={{ whiteSpace: "pre-line" }}>
            {request.tattooDescription}
          </div>
          <div className="request-item_title">REFERENCE PHOTO</div>

          {photos?.referencePhotoURL && (
            <div className="request-item_info">
              <a href={`${photos.referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
                {request.referencePhotoPath}
              </a>
            </div>
          )}

          {photos?.placementPhotoURL && (
            <>
              <div className="request-item_title">PLACEMENT PHOTO</div>
              <div className="request-item_info">
                <a href={`${photos.placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
                  {request.placementPhotoPath}
                </a>
              </div>
            </>
          )}
        </section>

        <section className="request-section_container">
          <div className="request-section_title">HISTORY LOG</div>
          {request.historyLog.map((item, index) => (
            <div className="request-log_container" key={String(item.dateCreated) + index}>
              <div className="request-item_title">
                {formatUnitedStatesDate(item.dateCreated)} @ {formatEstTimeWithSuffix(item.dateCreated)}
              </div>
              <div className="request-item_info">
                {item.action && (
                  <>
                    <p>Action:</p>
                    <p>{item.action}</p>
                  </>
                )}
                {item.note && (
                  <>
                    <p>Note:</p>
                    <p>{item.note}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
      <RequestActions request={request} />
    </AdminPage>
  );
}

export default AppointmentRequestById;
