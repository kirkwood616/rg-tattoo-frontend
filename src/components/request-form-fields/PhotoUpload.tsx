import RemoveFileButton from "components/buttons/RemoveFileButton";
import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { ChangeEvent, useContext } from "react";

type PhotoName = "referencePhoto" | "placementPhoto";

interface Props {
  name: PhotoName;
}

function PhotoUpload({ name }: Props) {
  const { state, dispatch } = useContext(RequestContext);

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.currentTarget.files) {
      resetPhoto();
    } else if (e.currentTarget.files[0]) {
      dispatch({ type: name, value: e.currentTarget.files![0] });
    } else {
      return;
    }
  }

  function resetPhoto(): void {
    dispatch({ type: name, value: null });
  }

  function labelTitle(): String {
    if (name === "referencePhoto") {
      return "Reference Photo:";
    } else {
      return "Placement Photo:";
    }
  }

  return (
    <section className="field_container">
      <label htmlFor={name}>{labelTitle()}</label>
      <div className="photo-upload">
        <label className="file-label">
          <input
            type="file"
            name={name}
            id={name}
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
            // trigger re-render based on unique key
            key={Math.random().toString(36)}
          />
          <div className="choose-file">Choose File</div>
        </label>
        {state[name].value && <div className="photo-file-name">{state[name].value?.name}</div>}
        {state[name].value && <RemoveFileButton onClick={resetPhoto} />}
      </div>
      <FormErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={name} />
    </section>
  );
}

export default PhotoUpload;
