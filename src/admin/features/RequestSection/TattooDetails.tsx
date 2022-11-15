import { AppointmentRequest, PhotoUrls } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
  photos: PhotoUrls | undefined;
}

function TattooDetails({ request, photos }: Props) {
  return (
    <RequestSection title="TATTOO DETAILS">
      <div className="items_container">
        <div className="request-item_title">STYLE</div>
        <div className="request-item_info">{request.tattooStyle}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">PLACEMENT</div>
        <div className="request-item_info">{request.tattooPlacement}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">BUDGET</div>
        <div className="request-item_info">{request.budget}</div>
      </div>
      <div className="items_container">
        <div className="request-item_title">DESCRIPTION</div>
        <div
          className="request-item_info"
          dangerouslySetInnerHTML={{ __html: request.tattooDescription }}
          style={{ whiteSpace: "pre-line" }}
        ></div>
      </div>
      <div className="items_container">
        <div className="request-item_title">REFERENCE PHOTO</div>
        {photos?.referencePhotoURL && (
          <div className="request-item_info">
            <a href={`${photos.referencePhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request.referencePhotoPath}
            </a>
          </div>
        )}
      </div>

      {photos?.placementPhotoURL && (
        <div className="items_container">
          <div className="request-item_title">PLACEMENT PHOTO</div>
          <div className="request-item_info">
            <a href={`${photos.placementPhotoURL}`} target="_blank" rel="noopener noreferrer">
              {request.placementPhotoPath}
            </a>
          </div>
        </div>
      )}
    </RequestSection>
  );
}

export default TattooDetails;
