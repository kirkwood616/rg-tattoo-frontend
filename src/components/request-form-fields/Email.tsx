import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function Email() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="email" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => dispatch({ type: "email", value: e.target.value })}
        value={state.email.value}
      />
      <FormErrorMessage message={"E-MAIL IS NOT VALID"} name={"email"} />
    </section>
  );
}

export default Email;
