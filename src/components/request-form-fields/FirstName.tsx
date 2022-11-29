import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function FirstName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="firstName" className={state.appointmentTime.value ? "label" : "label disabled"}>
        First Name:
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => dispatch({ type: "firstName", value: e.target.value })}
        value={state.firstName.value}
      />
      <FormErrorMessage message="FIRST NAME REQUIRED" name={"firstName"} />
    </section>
  );
}

export default FirstName;
