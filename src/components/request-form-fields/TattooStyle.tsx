import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function TattooStyle() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooStyle">Tattoo Style:</label>
      </span>
      <select
        name="tattooStyle"
        id="tattooStyle"
        onChange={(e) => dispatch({ type: "tattooStyle", value: e.target.value })}
        value={state.tattooStyle.value || "select"}
        required
      >
        <option value="select" disabled>
          --- Select Style ---
        </option>
        <option value="Linework">Linework</option>
        <option value="Black & White">Black & White</option>
        <option value="Full Color">Full Color</option>
        <option value="Lettering">Lettering</option>
      </select>
      <ErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} name={"tattooStyle"} />
    </>
  );
}

export default TattooStyle;
