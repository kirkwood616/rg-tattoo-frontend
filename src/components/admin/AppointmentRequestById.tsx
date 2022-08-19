import { format } from "date-fns";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSWR from "swr";
import { storage } from "../../firebaseConfig";
import { getRequest } from "../../services/AdminApiService";
import { formatTime } from "../../utils/Formatting";
import LoadingDotsIcon from "../loading/LoadingDotsIcon";
import AdminPage from "./AdminPage";
import "./AppointmentRequestById.css";
import ReqActions from "./ReqActions";

function AppointmentRequestById() {
  // LOCATION
  const location = useLocation();
  const locationIdRoute = location.state as string;
  const { id } = useParams();

  // SWR
  const { data: request, error: requestError } = useSWR(`/appointment-requests/${locationIdRoute}/${id!}`, getRequest, {
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
        if (request!.referencePhotoPath.length) {
          getDownloadURL(referencePhotoRef)
            .then((url) => {
              if (isMounted) setReferencePhotoURL(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (request!.placementPhotoPath.length) {
          getDownloadURL(placementPhotoRef)
            .then((url) => {
              if (isMounted) setPlacementPhotoURL(url);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };

      fetchImages();
    }
    return () => {
      isMounted = false;
    };
  }, [request]);

  if (requestError) return <h1>Something went wrong!</h1>;
  if (!request) return <LoadingDotsIcon />;
  return (
    <AdminPage title="Request">
      <div className="AppointmentRequestById">
        <h1>Appointment Request</h1>
        <div className="request-table">
          <div className="request-table_title">REQUEST STATUS</div>
          <div className="request-table_info">{request!.requestStatus.toUpperCase()}</div>

          <div className="request-table_title">Date Requested</div>
          <div className="request-table_info">{request!.requestDate}</div>
          <div className="request-table_title">Time Requested</div>
          <div className="request-table_info">{formatTime(request!.requestTime)}</div>
          <div className="request-table_title">Date Submitted</div>
          <div className="request-table_info">{format(new Date(request!.requestSubmittedDate), "M/dd/yyyy @ h:mm a")}</div>

          <div className="request-table_title">Name</div>
          <div className="request-table_info">{`${request!.firstName} ${request!.lastName}`}</div>
          <div className="request-table_title">Email</div>
          <div className="request-table_info">
            <a href={`mailto: ${request!.email}`}>{request!.email}</a>
          </div>
          <div className="request-table_title">Phone</div>
          <div className="request-table_info">{request!.phoneNumber}</div>
          <div className="request-table_title">Age</div>
          <div className="request-table_info">{request!.age}</div>

          <div className="request-table_title">Tattoo Style</div>
          <div className="request-table_info">{request!.tattooStyle}</div>
          <div className="request-table_title">Tattoo Placement</div>
          <div className="request-table_info">{request!.tattooPlacement}</div>
          <div className="request-table_title">Tattoo Description</div>
          <div className="request-table_info" style={{ whiteSpace: "pre-line" }}>
            {request!.tattooDescription}
          </div>
          <div className="request-table_title">Reference Photo</div>
          <div className="request-table_info">
            <a href={`${referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request!.referencePhotoPath}
            </a>
          </div>
          {request!.placementPhotoPath && (
            <>
              <div className="request-table_title">Placement Photo</div>
              <div className="request-table_info">
                <a href={`${placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
                  {request!.placementPhotoPath}
                </a>
              </div>
            </>
          )}

          <div className="request-table_title">HISTORY LOG</div>
          {request!.historyLog.map((item, index) => (
            <div className="request-table_info" key={String(item.dateCreated) + index}>
              <p>{format(new Date(item.dateCreated), "M/dd/yyyy @ h:mm a")}</p>
              {item.action && <p>{item.action}</p>}
              {item.note && (
                <>
                  <p>Note:</p>
                  <p>{item.note}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <ReqActions request={request} />
      </div>
    </AdminPage>
  );
}

export default AppointmentRequestById;
