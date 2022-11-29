import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function LastName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="lastName" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Last Name:
      </label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => dispatch({ type: "lastName", value: e.target.value })}
        value={state.lastName.value}
      />
      <FormErrorMessage message={"LAST NAME REQUIRED"} name={"lastName"} />
    </section>
  );
}

export default LastName;
