import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

function LastName() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label" style={{ marginBottom: ".5rem" }}>
        <label htmlFor="lastName">Last Name:</label>
      </span>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => dispatch({ type: "lastName", value: e.target.value })}
        value={state.lastName.value}
        disabled={isTextDisabled(state, "lastName")}
      />
      <FormErrorMessage message={"LAST NAME REQUIRED"} name={"lastName"} />
    </>
  );
}

export default LastName;
