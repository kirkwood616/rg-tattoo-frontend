import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  lastNameError: boolean;
  setLastNameError: Dispatch<SetStateAction<boolean>>;
}

function LastName({ lastNameError, setLastNameError }: Props) {
  // CONTEXT
  let { lastName, setLastName } = useContext(RequestContext);

  return (
    <>
      <span className="label" style={{ marginBottom: ".5rem" }}>
        <label htmlFor="lastName">Last Name:</label>
      </span>
      <input type="text" name="lastName" id="lastName" onChange={(e) => validateName(e, setLastName, setLastNameError)} value={lastName} required />
      {lastNameError ? <ErrorMessage message={"LAST NAME REQUIRED"} /> : ""}
    </>
  );
}

export default LastName;
