import { PhotoName } from "models/AppointmentRequest";
import PlacementImage from "./PlacementImage";
import ReferenceImage from "./ReferenceImage";

interface Props {
  imageName: PhotoName;
}
function Images({ imageName }: Props) {
  switch (imageName) {
    case "placementPhoto":
      <PlacementImage />;
      break;
    case "referencePhoto":
      <ReferenceImage />;
      break;
  }
  return <div className="Images"></div>;
}

export default Images;
