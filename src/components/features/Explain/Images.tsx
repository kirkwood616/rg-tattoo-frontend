import { PhotoName } from "models/AppointmentRequest";
import PlacementImage from "./PlacementImage";
import ReferenceImage from "./ReferenceImage";

interface Props {
  imageName: PhotoName;
}
function Images({ imageName }: Props) {
  switch (imageName) {
    case "placementPhoto":
      return <PlacementImage />;
    case "referencePhoto":
      return <ReferenceImage />;
  }
}

export default Images;
