import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateTattooDescription } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  tattooDescriptionError: boolean;
  setTattooDescriptionError: Dispatch<SetStateAction<boolean>>;
}

function TattooDescription({ tattooDescriptionError, setTattooDescriptionError }: Props) {
  // CONTEXT
  let { tattooDescription, setTattooDescription } = useContext(RequestContext);

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
