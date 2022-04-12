import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function TattooDescription() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooDescription">Tattoo Description:</label>
      </span>
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        onChange={(e) => dispatch({ type: "tattooDescription", value: e.target.value })}
        value={state.tattooDescription.value || ""}
        minLength={7}
        required
      />
      <ErrorMessage message={"MUST BE AT LEAST 7 CHARACTERS"} name={"tattooDescription"} />
    </>
  );
}

export default TattooDescription;
