import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function FirstName() {
  // CONTEXT
  let { firstName, setFirstName, state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="firstName">First Name:</label>
      </span>
      <input type="text" name="firstName" id="firstName" onChange={(e) => validateName(e, setFirstName, dispatch, "firstName")} value={firstName} required />
      {state.firstNameError ? <ErrorMessage message={"FIRST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default FirstName;
