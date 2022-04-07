import { Dispatch, SetStateAction } from "react";
import { validateTattooDescription } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  tattooDescription: string;
  setTattooDescription: Dispatch<SetStateAction<string>>;
  tattooDescriptionError: boolean;
  setTattooDescriptionError: Dispatch<SetStateAction<boolean>>;
}

function TattooDescription({ tattooDescription, setTattooDescription, tattooDescriptionError, setTattooDescriptionError }: Props) {
  return (
    <>
      <span className="label">
        <label htmlFor="tattooDescription">Tattoo Description:</label>
      </span>
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        onChange={(e) => validateTattooDescription(e, setTattooDescription, setTattooDescriptionError)}
        value={tattooDescription}
        minLength={7}
        required
      />
      {tattooDescriptionError ? <ErrorMessage message={"DESCRIPTION MUST BE AT LEAST 7 CHARACTERS"} /> : ""}
    </>
  );
}

export default TattooDescription;
