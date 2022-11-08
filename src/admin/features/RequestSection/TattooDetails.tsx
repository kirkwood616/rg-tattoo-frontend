import { AppointmentRequest, PhotoUrls } from "models/AppointmentRequest";
import RequestSection from "./RequestSection";

interface Props {
  request: AppointmentRequest;
  photos: PhotoUrls | undefined;
}

function TattooDetails({ request, photos }: Props) {
  return (
    <RequestSection title="TATTOO DETAILS">
      <div className="request-item_title">STYLE</div>
      <div className="request-item_info">{request.tattooStyle}</div>
      <div className="request-item_title">PLACEMENT</div>
      <div className="request-item_info">{request.tattooPlacement}</div>
      <div className="request-item_title">BUDGET</div>
      <div className="request-item_info">{request.budget}</div>
      <div className="request-item_title">DESCRIPTION</div>
      <div
        className="request-item_info"
        dangerouslySetInnerHTML={{ __html: request.tattooDescription }}
        style={{ whiteSpace: "pre-line" }}
      ></div>
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
    </RequestSection>
  );
}

export default TattooDetails;
