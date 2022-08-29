import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import RemoveFileButton from "../buttons/RemoveFileButton";
import ErrorMessage from "../ErrorMessage";

function ReferenceImage() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  // STATE
  const [referenceRandom, setReferenceRandom] = useState<string>("");

  // FUNCTIONS
  function handleReferencePhotoChange(e: any): void {
    if (e.target.files[0]) {
      dispatch({ type: "referencePhoto", value: e.target.files[0] });
    } else {
      resetReference();
    }
  }

  function resetReference(): void {
    // triggers file input re-render based on key value
    let randomText = Math.random().toString(36);
    setReferenceRandom(randomText);
    dispatch({ type: "referencePhoto", value: null });
  }

  return (
    <>
      <span className="label">
        <label htmlFor="referencePhoto">Reference Photo:</label>
      </span>
      <div className="photo-upload">
        <label>
          <input type="file" name="referencePhoto" id="referencePhoto" accept="image/*" onChange={handleReferencePhotoChange} key={referenceRandom} />
          <div className="chooseFile">Choose File</div>
        </label>
        {state.referencePhoto.value && <div className="photoFileName">{state.referencePhoto.value?.name}</div>}
        {state.referencePhoto.value ? <RemoveFileButton onClick={resetReference} /> : ""}
      </div>
      <ErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={"referencePhoto"} />
    </>
  );
}

export default ReferenceImage;
