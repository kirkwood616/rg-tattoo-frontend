/* eslint-disable @next/next/no-img-element */
import * as Explain from "components/features/request-form-fields/explain/";
import RemoveFileButton from "components/ui/buttons/RemoveFileButton";
import FormError from "components/ui/errors/FormError";
import ExplainInfo from "components/ui/explain-info/ExplainInfo";
import * as Form from "components/ui/form";
import RequestContext from "context/RequestContext";
import { PhotoName } from "models/AppointmentRequest";
import { ChangeEvent, useContext, useState } from "react";
import styles from "styles/features/PhotoUpload.module.css";
import { readFileSetState } from "utils/PhotoUpload";

interface PhotoUploadProps {
  photoName: PhotoName;
}

export default function PhotoUpload({ photoName }: PhotoUploadProps) {
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const { state, dispatch } = useContext(RequestContext);

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
    <Form.Field>
      <Form.Label labelID={photoName}>
        <ExplainInfo>
          <Explain.Images imageName={photoName} />
        </ExplainInfo>
      </Form.Label>
      <div className={styles.PhotoUpload}>
        <label>
          <input
            type="file"
            name={photoName}
            id={photoName}
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
            // trigger re-render based on unique key
            key={Math.random().toString(36)}
          />
          <div className={styles.choose_file}>Choose File</div>
        </label>
        {state[photoName].value && (
          <>
            <img src={imageData?.toString()} alt="user selected" />
            <div className={styles.photo_file_name}>{state[photoName].value?.name}</div>
            <RemoveFileButton onClick={resetPhoto} />
          </>
        )}
      </div>
      {state[photoName].hasErrors && state[photoName].checkCount > 0 && (
        <FormError errorMessage={"REFERENCE PHOTO REQUIRED"} name={photoName} />
      )}
    </Form.Field>
  );
}
