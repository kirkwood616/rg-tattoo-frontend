import { Dispatch, SetStateAction } from "react";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  firstNameError: boolean;
  setFirstNameError: Dispatch<SetStateAction<boolean>>;
}

function FirstName({ firstName, setFirstName, firstNameError, setFirstNameError }: Props) {
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
