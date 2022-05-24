import { ChangeEvent, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import RemoveFileButton from "../buttons/RemoveFileButton";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

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

  function isFieldDisabled() {
    if (!state.appointmentTime.value) {
      return "photo-upload_disabled";
    } else {
      return "photo-upload";
    }
  }

  return (
    <>
      <label htmlFor={name} className={state.appointmentTime.value ? "label" : "label disabled"}>
        {labelTitle()}
      </label>
      <div className={isFieldDisabled()}>
        <label className="file-label">
          <input
            type="file"
            name={name}
            id={name}
            accept="image/*"
            onChange={(e) => handlePhotoChange(e)}
            disabled={isTextDisabled(state, name)}
            // trigger re-render based on unique key
            key={Math.random().toString(36)}
          />
          <div className="choose-file">Choose File</div>
        </label>
        {state[name].value && <div className="photo-file-name">{state[name].value?.name}</div>}
        {state[name].value && <RemoveFileButton onClick={() => resetPhoto()} />}
      </div>
      <FormErrorMessage message={"REFERENCE PHOTO REQUIRED"} name={name} />
    </>
  );
}

export default PhotoUpload;
