import { Dispatch, SetStateAction } from "react";
import { validateAge } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  age: number;
  setAge: Dispatch<SetStateAction<number>>;
  ageError: boolean;
  setAgeError: Dispatch<SetStateAction<boolean>>;
}

function Age({ age, setAge, ageError, setAgeError }: Props) {
  return (
    <>
      <span className="label">
        <label htmlFor="age">Age:</label>
      </span>
      <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => validateAge(e, setAge, setAgeError)} value={age} required />
      {ageError ? <ErrorMessage message={"MUST BE 18 OR OLDER"} /> : ""}
    </>
  );
}

export default Age;
