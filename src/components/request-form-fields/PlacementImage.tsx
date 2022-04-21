import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import RemoveFileButton from "../buttons/RemoveFileButton";

function PlacementImage() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  // STATE
  const [placementRandom, setPlacementRandom] = useState<string>("");

  // FUNCTIONS
  function handlePlacementPhotoChange(e: any): void {
    if (e.target.files[0]) {
      dispatch({ type: "placementPhoto", value: e.target.files[0] });
    } else {
      resetPlacement();
    }
  }

  function resetPlacement(): void {
    // triggers file input re-render based on key value
    let randomText = Math.random().toString(36);
    setPlacementRandom(randomText);
    dispatch({ type: "placementPhoto", value: null });
  }

  return (
    <>
      <span className="label">
        <label htmlFor="placementPhoto">Placement Photo:</label>
      </span>
      <div className="photo-upload">
        <input type="file" name="placementPhoto" id="placementPhoto" accept="image/*" onChange={handlePlacementPhotoChange} key={placementRandom} />

        {state.placementPhoto.value ? <RemoveFileButton onClick={resetPlacement} /> : ""}
      </div>
    </>
  );
}

export default PlacementImage;
