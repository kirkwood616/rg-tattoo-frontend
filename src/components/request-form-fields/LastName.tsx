import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function LastName() {
  // CONTEXT
  let { lastName, setLastName, state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label" style={{ marginBottom: ".5rem" }}>
        <label htmlFor="lastName">Last Name:</label>
      </span>
      <input type="text" name="lastName" id="lastName" onChange={(e) => validateName(e, setLastName, dispatch, "lastName")} value={lastName} required />
      {state.lastNameError ? <ErrorMessage message={"LAST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default LastName;
