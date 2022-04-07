import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  firstNameError: boolean;
  setFirstNameError: Dispatch<SetStateAction<boolean>>;
}

function FirstName({ firstNameError, setFirstNameError }: Props) {
  // CONTEXT
  let { firstName, setFirstName } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="firstName">First Name:</label>
      </span>
      <input type="text" name="firstName" id="firstName" onChange={(e) => validateName(e, setFirstName, setFirstNameError)} value={firstName} required />
      {firstNameError ? <ErrorMessage message={"FIRST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default FirstName;
