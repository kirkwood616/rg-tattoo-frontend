import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateTattooDescription } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function TattooDescription() {
  // CONTEXT
  let { tattooDescription, setTattooDescription, state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooDescription">Tattoo Description:</label>
      </span>
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        onChange={(e) => validateTattooDescription(e, setTattooDescription, dispatch)}
        value={tattooDescription}
        minLength={7}
        required
      />
      {state.tattooDescriptionError ? <ErrorMessage message={"DESCRIPTION MUST BE AT LEAST 7 CHARACTERS"} /> : ""}
    </>
  );
}

export default TattooDescription;
