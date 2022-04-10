import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateTattooPlacement } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function TattooPlacement() {
  // CONTEXT
  let { tattooPlacement, setTattooPlacement, state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooPlacement">Tattoo Placement:</label>
      </span>
      <input
        type="text"
        name="tattooPlacement"
        id="tattooPlacement"
        maxLength={30}
        onChange={(e) => validateTattooPlacement(e, setTattooPlacement, dispatch)}
        value={tattooPlacement}
        required
      />
      {state.tattooPlacementError ? <ErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} /> : ""}
    </>
  );
}

export default TattooPlacement;
