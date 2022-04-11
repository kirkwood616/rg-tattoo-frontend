import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function Age() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="age">Age:</label>
      </span>
      <input
        type="number"
        name="age"
        id="age"
        min={18}
        max={100}
        onChange={(e) => dispatch({ type: "age", value: Number(e.target.value) })}
        value={state.age.value || ""}
        required
      />
      {state.age.hasErrors ? <ErrorMessage message={"MUST BE 18 OR OLDER"} /> : ""}
    </>
  );
}

export default Age;
