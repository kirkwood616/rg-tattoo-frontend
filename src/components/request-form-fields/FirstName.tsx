import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function FirstName() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="firstName">First Name:</label>
      </span>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => dispatch({ type: "firstName", value: e.target.value })}
        value={state.firstName.value || ""}
        required
      />
      {state.firstName.hasErrors ? <ErrorMessage message={"FIRST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default FirstName;
