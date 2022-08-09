import { format } from "date-fns";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import { storage } from "../../firebaseConfig";
import { AppointmentRequest } from "../../models/AppointmentRequest";
import { formatTime } from "../../utils/Formatting";
import GoButton from "../buttons/GoButton";
import AdminPage from "./AdminPage";
import "./AppointmentRequestById.css";
import ApproveModal from "./modals/ApproveModal";
import DenyModal from "./modals/DenyModal";

function AppointmentRequestById() {
  // CONTEXT
  const { appointmentRequests, deniedRequests } = useContext(AdminContext);

  // LOCATION
  const location = useLocation();
  const locationIdRoute = location.state;
  const { id } = useParams();

  function useCollection(): AppointmentRequest | undefined {
    const activeRequest: AppointmentRequest | undefined = appointmentRequests.find((request) => request._id === id);
    const deniedRequest: AppointmentRequest | undefined = deniedRequests.find((request) => request._id === id);
    if (locationIdRoute === "new") {
      return activeRequest;
    } else if (locationIdRoute === "denied") {
      return deniedRequest;
    }
  }

  // FIND REQUEST FROM STATE
  const request: AppointmentRequest | undefined = useCollection();

  // APPROVE & DENY STATES
  const [isApproveActive, setIsApproveActive] = useState(false);
  const [isDenyActive, setIsDenyActive] = useState(false);

  // PHOTOS
  const [referencePhotoURL, setReferencePhotoURL] = useState("");
  const [placementPhotoURL, setPlacementPhotoURL] = useState("");

  useEffect(() => {
    let isMounted = true;
    const referencePhotoRef: StorageReference = ref(storage, `images/${request!.referencePhotoPath}`);
    const placementPhotoRef: StorageReference = ref(storage, `images/${request!.placementPhotoPath}`);

    const fetchImages = async () => {
      if (request!.referencePhotoPath) {
        getDownloadURL(referencePhotoRef)
          .then((url) => {
            if (isMounted) setReferencePhotoURL(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (request!.placementPhotoPath) {
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
    return () => {
      isMounted = false;
    };
  }, [request]);

  return (
    <AdminPage title="Request">
      <div className="AppointmentRequestById">
        <h1>Appointment Request</h1>
        <div className="request-table">
          <div className="request-table-title">Requested Date</div>
          <div className="request-table-info">{request!.requestDate}</div>
          <div className="request-table-title">Requested Time</div>
          <div className="request-table-info">{formatTime(request!.requestTime)}</div>
          <div className="request-table-title">Name</div>
          <div className="request-table-info">{`${request!.firstName} ${request!.lastName}`}</div>
          <div className="request-table-title">Email</div>
          <div className="request-table-info">
            <a href={`mailto: ${request!.email}`}>{request!.email}</a>
          </div>
          <div className="request-table-title">Phone</div>
          <div className="request-table-info">{request!.phoneNumber}</div>
          <div className="request-table-title">Age</div>
          <div className="request-table-info">{request!.age}</div>
          <div className="request-table-title">Tattoo Style</div>
          <div className="request-table-info">{request!.tattooStyle}</div>
          <div className="request-table-title">Tattoo Placement</div>
          <div className="request-table-info">{request!.tattooPlacement}</div>
          <div className="request-table-title">Tattoo Description</div>
          <div className="request-table-info" style={{ whiteSpace: "pre-line" }}>
            {request!.tattooDescription}
          </div>
          <div className="request-table-title">Reference Photo</div>
          <div className="request-table-info">
            <a href={`${referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request!.referencePhotoPath}
            </a>
          </div>
          <div className="request-table-title">Placement Photo</div>
          <div className="request-table-info">
            {request!.placementPhotoPath.length ? (
              <a href={`${placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
                {request!.placementPhotoPath}
              </a>
            ) : (
              "None"
            )}
          </div>
          <div className="request-table-title">Request Submitted</div>
          <div className="request-table-info">{format(new Date(request!.requestSubmittedDate), "M/dd/yyyy @ h:mm a")}</div>
        </div>
        {request!.isRequestDenied === false && (
          <>
            <GoButton type="button" text="APPROVE" backgroundColor="green" onClick={() => setIsApproveActive(true)} />
            <GoButton type="button" text="REJECT" backgroundColor="red" onClick={() => setIsDenyActive(true)} />
            <ApproveModal isApproveActive={isApproveActive} setIsApproveActive={setIsApproveActive} request={request!} />
            <DenyModal isDenyActive={isDenyActive} setIsDenyActive={setIsDenyActive} request={request!} />
          </>
        )}
      </div>
    </AdminPage>
  );
}

export default AppointmentRequestById;
