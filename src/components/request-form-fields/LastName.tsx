import { Dispatch, SetStateAction } from "react";
import { validateName } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  lastNameError: boolean;
  setLastNameError: Dispatch<SetStateAction<boolean>>;
}

function LastName({ lastName, setLastName, lastNameError, setLastNameError }: Props) {
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
