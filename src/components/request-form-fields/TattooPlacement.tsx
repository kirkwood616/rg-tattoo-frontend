import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function TattooPlacement() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

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
        onChange={(e) => dispatch({ type: "tattooPlacement", value: e.target.value })}
        value={state.tattooPlacement.value || ""}
      />
      <ErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} name={"tattooPlacement"} />
    </>
  );
}

export default TattooPlacement;
