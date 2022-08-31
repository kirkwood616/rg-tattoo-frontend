import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function Age() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="age" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Age:
      </label>
      <input type="number" name="age" id="age" min={18} max={100} onChange={(e) => dispatch({ type: "age", value: Number(e.target.value) })} value={state.age.value || ""} />
      <FormErrorMessage message={"MUST BE 18 OR OLDER"} name={"age"} />
    </>
  );
}

export default Age;
