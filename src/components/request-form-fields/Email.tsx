import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function Email() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="email" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Email:
      </label>
      <input type="email" name="email" id="email" onChange={(e) => dispatch({ type: "email", value: e.target.value })} value={state.email.value} />
      <FormErrorMessage message={"E-MAIL IS NOT VALID"} name={"email"} />
    </>
  );
}

export default Email;
