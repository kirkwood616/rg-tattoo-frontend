import { format } from "date-fns";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { storage } from "../../firebaseConfig";
import { getRequest } from "../../services/AdminApiService";
import { formatDate, formatTime } from "../../utils/Formatting";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import AdminPage from "./AdminPage";
import "./AppointmentRequestById.css";
import useLocationRoute from "./hooks/useLocationRoute";
import ReqActions from "./ReqActions";

function AppointmentRequestById() {
  // LOCATION
  const { route, id, title } = useLocationRoute();

  // SWR
  const { data: request, error: requestError } = useSWR(`appointment-requests/${route}/${id}`, getRequest, {
    revalidateOnFocus: false,
  });

  // PHOTOS
  const [referencePhotoURL, setReferencePhotoURL] = useState("");
  const [placementPhotoURL, setPlacementPhotoURL] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (request) {
      const referencePhotoRef: StorageReference = ref(storage, `images/${request!.referencePhotoPath}`);
      const placementPhotoRef: StorageReference = ref(storage, `images/${request!.placementPhotoPath}`);

      const fetchImages = async () => {
        if (request!.referencePhotoPath.length > 0) {
          getDownloadURL(referencePhotoRef)
            .then((url) => {
              if (isMounted) setReferencePhotoURL(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (request!.placementPhotoPath.length > 0) {
          getDownloadURL(placementPhotoRef)
            .then((url) => {
              if (isMounted) setPlacementPhotoURL(url);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };

      fetchImages();
    }
    return () => {
      isMounted = false;
    };
  }, [request]);

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
          <div className="request-item_info">{request!.requestStatus.replace("-", " ").toUpperCase()}</div>
          <div className="request-item_title">REQUESTED DATE</div>
          <div className="request-item_info">{formatDate(request!.requestDate)}</div>
          <div className="request-item_title">REQUESTED TIME</div>
          <div className="request-item_info">{formatTime(request!.requestTime)}</div>
          <div className="request-item_title">SUBMITTED DATE</div>
          <div className="request-item_info">{format(new Date(request!.requestSubmittedDate), "M/dd/yyyy @ h:mm a")}</div>
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
          <div className="request-item_info">{`${request!.firstName} ${request!.lastName}`}</div>
          <div className="request-item_title">AGE</div>
          <div className="request-item_info">{request!.age}</div>
          <div className="request-item_title">EMAIL</div>
          <div className="request-item_info">
            <a href={`mailto: ${request!.email}`}>{request!.email}</a>
          </div>
          <div className="request-item_title">PHONE</div>
          <div className="request-item_info">{request!.phoneNumber}</div>
        </section>

        <section className="request-section_container">
          <div className="request-section_title">DETAILS</div>
          <div className="request-item_title">STYLE</div>
          <div className="request-item_info">{request!.tattooStyle}</div>
          <div className="request-item_title">PLACEMENT</div>
          <div className="request-item_info">{request!.tattooPlacement}</div>
          <div className="request-item_title">DESCRIPTION</div>
          <div className="request-item_info" style={{ whiteSpace: "pre-line" }}>
            {request!.tattooDescription}
          </div>
          <div className="request-item_title">Reference Photo</div>
          <div className="request-item_info">
            <a href={`${referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request!.referencePhotoPath}
            </a>
          </div>
          {request!.placementPhotoPath && (
            <>
              <div className="request-item_title">Placement Photo</div>
              <div className="request-item_info">
                <a href={`${placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
                  {request!.placementPhotoPath}
                </a>
              </div>
            </>
          )}
        </section>

        <section className="request-section_container">
          <div className="request-section_title">HISTORY LOG</div>
          {request!.historyLog.map((item, index) => (
            <div className="request-log_container" key={String(item.dateCreated) + index}>
              <div className="request-item_title">{format(new Date(item.dateCreated), "M/dd/yyyy @ h:mm a")}</div>
              <div className="request-item_info">
                {item.action && <p>{item.action}</p>}
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
      <ReqActions request={request} />
    </AdminPage>
  );
}

export default AppointmentRequestById;
