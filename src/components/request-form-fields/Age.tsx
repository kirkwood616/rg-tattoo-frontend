import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateAge } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  ageError: boolean;
  setAgeError: Dispatch<SetStateAction<boolean>>;
}

function Age({ ageError, setAgeError }: Props) {
  // CONTEXT
  let { age, setAge } = useContext(RequestContext);

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
