import RemoveFileButton from "components/buttons/RemoveFileButton";
import FormErrorMessage from "components/errors/FormErrorMessage";
import InfoExplain from "components/features/Explain/Explain";
import RequestContext from "context/RequestContext";
import { PhotoName } from "models/AppointmentRequest";
import { ChangeEvent, useContext, useState } from "react";
import { formatCamelToTitle } from "utils/Formatting";
import { readFileSetState } from "utils/PhotoUpload";
import * as Explain from "../features/Explain";

interface Props {
  photoName: PhotoName;
}

function PhotoUpload({ photoName }: Props) {
  const { state, dispatch } = useContext(RequestContext);
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);

  function resetPhoto(): void {
    dispatch({ type: photoName, value: null });
  }

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.currentTarget.files) {
      resetPhoto();
    } else if (e.currentTarget.files[0]) {
      dispatch({ type: photoName, value: e.currentTarget.files[0] });
      readFileSetState(e.currentTarget.files[0], setImageData);
    }
  }

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor={photoName}>{formatCamelToTitle(photoName)}:</label>
        <InfoExplain children={<Explain.Images imageName={photoName} />} />
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
        {state[photoName].value && (
          <>
            <img src={imageData?.toString()} alt="upload" />
            <RemoveFileButton onClick={resetPhoto} />
          </>
        )}
      </div>
      <FormErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={photoName} />
    </section>
  );
}

export default PhotoUpload;
