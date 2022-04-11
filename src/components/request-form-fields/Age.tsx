import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateAge } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function Age() {
  // CONTEXT
  let { age, setAge, state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="age">Age:</label>
      </span>
      <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => validateAge(e, setAge, dispatch)} value={age} required />
      {state.ageError ? <ErrorMessage message={"MUST BE 18 OR OLDER"} /> : ""}
    </>
  );
}

export default Age;
