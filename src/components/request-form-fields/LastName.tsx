import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function LastName() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label" style={{ marginBottom: ".5rem" }}>
        <label htmlFor="lastName">Last Name:</label>
      </span>
      <input type="text" name="lastName" id="lastName" onChange={(e) => dispatch({ type: "lastName", value: e.target.value })} value={state.lastName.value || ""} required />
      {state.lastName.hasErrors ? <ErrorMessage message={"LAST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default LastName;
