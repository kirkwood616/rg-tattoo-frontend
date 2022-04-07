import { Dispatch, SetStateAction } from "react";

interface Props {
  setReferenceImage: Dispatch<SetStateAction<File | null>>;
}

function ReferenceImage({ setReferenceImage }: Props) {
  function handleReferencePhotoChange(e: any): void {
    if (e.target.files[0]) {
      setReferenceImage(e.target.files[0]);
    }
  }

  return (
    <>
      <span className="label">
        <label htmlFor="referencePhoto">Reference Photo:</label>
      </span>
      <div className="photo-upload">
        <input type="file" name="referencePhoto" id="referencePhoto" accept="image/*" onChange={handleReferencePhotoChange} />
      </div>
    </>
  );
}

export default ReferenceImage;
