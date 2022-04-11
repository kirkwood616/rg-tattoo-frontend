import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function ReferenceImage() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

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
        <input type="file" name="referencePhoto" id="referencePhoto" accept="image/*" onChange={handleReferencePhotoChange} key={referenceRandom} />

        {state.referencePhoto.value ? (
          <button type="button" onClick={resetReference} style={{ display: "block", margin: "auto" }}>
            REMOVE FILE
          </button>
        ) : (
          ""
        )}
      </div>
      {state.referencePhoto.hasErrors ? <ErrorMessage message={"REFERENCE PHOTO REQUIRED"} /> : ""}
    </>
  );
}

export default ReferenceImage;
