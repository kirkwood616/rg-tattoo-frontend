import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

function Email() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="email" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => dispatch({ type: "email", value: e.target.value })}
        value={state.email.value}
        disabled={isTextDisabled(state, "email")}
      />
      <FormErrorMessage message={"E-MAIL IS NOT VALID"} name={"email"} />
    </>
  );
}

export default Email;
