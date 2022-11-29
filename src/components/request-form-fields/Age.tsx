import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function Age() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="age" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Age:
      </label>
      <input
        type="number"
        name="age"
        id="age"
        min={18}
        max={100}
        onChange={(e) => dispatch({ type: "age", value: Number(e.target.value) })}
        value={state.age.value || ""}
      />
      <FormErrorMessage message={"MUST BE 18 OR OLDER"} name={"age"} />
    </section>
  );
}

export default Age;
