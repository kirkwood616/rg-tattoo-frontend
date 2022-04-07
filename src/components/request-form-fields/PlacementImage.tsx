import { Dispatch, SetStateAction } from "react";

interface Props {
  setPlacementImage: Dispatch<SetStateAction<File | null>>;
}

function PlacementImage({ setPlacementImage }: Props) {
  function handlePlacementPhotoChange(e: any): void {
    if (e.target.files[0]) {
      setPlacementImage(e.target.files[0]);
    }
  }

  return (
    <>
      <span className="label">
        <label htmlFor="placementPhoto">Placement Photo:</label>
      </span>
      <div className="photo-upload">
        <input type="file" name="placementPhoto" id="placementPhoto" accept="image/*" onChange={handlePlacementPhotoChange} />
      </div>
    </>
  );
}

export default PlacementImage;
