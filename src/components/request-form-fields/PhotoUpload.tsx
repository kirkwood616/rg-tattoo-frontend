import RemoveFileButton from "components/buttons/RemoveFileButton";
import FormErrorMessage from "components/errors/FormErrorMessage";
import InfoExplain from "components/features/Explain/Explain";
import RequestContext from "context/RequestContext";
import { ChangeEvent, useContext } from "react";
import { formatCamelToTitle } from "utils/Formatting";
import * as Explain from "../features/Explain";

type PhotoName = "referencePhoto" | "placementPhoto";

interface Props {
  photoName: PhotoName;
}

function PhotoUpload({ photoName }: Props) {
  const { state, dispatch } = useContext(RequestContext);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.currentTarget.files) {
      resetPhoto();
    } else if (e.currentTarget.files[0]) {
      dispatch({ type: photoName, value: e.currentTarget.files![0] });
    } else {
      return;
    }
  }

  function resetPhoto(): void {
    dispatch({ type: photoName, value: null });
  }

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor={photoName}>{formatCamelToTitle(photoName)}:</label>
        <InfoExplain children={photoName === "referencePhoto" ? <Explain.ReferenceImage /> : <Explain.PlacementImage />} />
      </div>
      <div className="photo-upload">
        <label className="file-label">
          <input
            type="file"
            name={photoName}
            id={photoName}
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
            // trigger re-render based on unique key
            key={Math.random().toString(36)}
          />
          <div className="choose-file">Choose File</div>
        </label>
        {state[photoName].value && <div className="photo-file-name">{state[photoName].value?.name}</div>}
        {state[photoName].value && <RemoveFileButton onClick={resetPhoto} />}
      </div>
      <FormErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={photoName} />
    </section>
  );
}

export default PhotoUpload;
