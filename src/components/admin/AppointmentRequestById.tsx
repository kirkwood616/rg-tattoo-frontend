import { format } from "date-fns";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AppointmentRequest from "../../models/AppointmentRequest";
import AdminPage from "./AdminPage";
import { storage } from "../../firebaseConfig";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import "./AppointmentRequestById.css";
import GoButton from "../buttons/GoButton";

function AppointmentRequestById() {
  // CONTEXT
  let { appointmentRequests } = useContext(AppContext);

  // REQUEST ID
  let { id } = useParams<string>();

  // FIND REQUEST FROM STATE
  let request: AppointmentRequest | undefined = appointmentRequests.find((request) => request._id === id);

  // PHOTOS
  const referencePhotoRef: StorageReference = ref(storage, `images/${request?.referencePhotoPath}`);
  const placementPhotoRef: StorageReference = ref(storage, `images/${request?.placementPhotoPath}`);
  const [referencePhotoURL, setReferencePhotoURL] = useState<string>("");
  const [placementPhotoURL, setPlacementPhotoURL] = useState<string>("");

  if (request?.referencePhotoPath) {
    getDownloadURL(referencePhotoRef)
      .then((url) => {
        setReferencePhotoURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (request?.placementPhotoPath) {
    getDownloadURL(placementPhotoRef)
      .then((url) => {
        setPlacementPhotoURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AdminPage title="Request">
      <div className="AppointmentRequestById">
        <h1>Appointment Request</h1>
        <div className="request-table">
          <div className="request-table-title">Requested Date</div>
          <div className="request-table-info">{format(new Date(request!.requestDateTime), "M-dd-yyyy")}</div>
          <div className="request-table-title">Requested Time</div>
          <div className="request-table-info">{format(new Date(request!.requestDateTime), "H:mm a")}</div>
          <div className="request-table-title">Name</div>
          <div className="request-table-info">{`${request?.firstName} ${request?.lastName}`}</div>
          <div className="request-table-title">Email</div>
          <div className="request-table-info">
            <a href={`mailto: ${request?.email}`}>{request?.email}</a>
          </div>
          <div className="request-table-title">Phone</div>
          <div className="request-table-info">{request?.phoneNumber}</div>
          <div className="request-table-title">Age</div>
          <div className="request-table-info">{request?.age}</div>
          <div className="request-table-title">Tattoo Style</div>
          <div className="request-table-info">{request?.tattooStyle}</div>
          <div className="request-table-title">Tattoo Placement</div>
          <div className="request-table-info">{request?.tattooPlacement}</div>
          <div className="request-table-title">Tattoo Description</div>
          <div className="request-table-info">{request?.tattooDescription}</div>
          <div className="request-table-title">Reference Photo</div>
          <div className="request-table-info">
            {request?.referencePhotoPath.length ? (
              <a href={`${referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
                {request?.referencePhotoPath}
              </a>
            ) : (
              "None"
            )}
          </div>
          <div className="request-table-title">Placement Photo</div>
          <div className="request-table-info">
            {request?.placementPhotoPath.length ? (
              <a href={`${placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
                {request?.placementPhotoPath}
              </a>
            ) : (
              "None"
            )}
          </div>
          <div className="request-table-title">Request Submitted</div>
          <div className="request-table-info">{format(new Date(request!.requestSubmittedDate), "M-dd-yyyy @ H:mm a")}</div>
        </div>
        <GoButton type="button" text="APPROVE" backgroundColor="green" />
        <GoButton type="button" text="REJECT" backgroundColor="red" />
      </div>
    </AdminPage>
  );
}

export default AppointmentRequestById;
