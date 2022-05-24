import { ChangeEvent, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import RemoveFileButton from "../buttons/RemoveFileButton";
import ErrorMessage from "../ErrorMessage";

type PhotoName = "referencePhoto" | "placementPhoto";

interface Props {
  name: PhotoName;
}

function PhotoUpload({ name }: Props) {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  // FUNCTIONS
  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.currentTarget.files![0]) {
      dispatch({ type: name, value: e.currentTarget.files![0] });
    } else {
      resetPhoto();
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
    <>
      <span className="label">
        <label htmlFor={name}>{labelTitle()}</label>
      </span>
      <div className="photo-upload">
        <label>
          <input type="file" name={name} id={name} accept="image/*" onChange={(e) => handlePhotoChange(e)} key={Math.random().toString(36)} />
          <div className="choose-file">Choose File</div>
        </label>
        {state[name].value && <div className="photo-file-name">{state[name].value?.name}</div>}
        {state[name].value && <RemoveFileButton onClick={() => resetPhoto()} />}
      </div>
      <ErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={name} />
    </>
  );
}

export default PhotoUpload;
