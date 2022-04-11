import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function Email() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="email">Email:</label>
      </span>
      <input type="email" name="email" id="email" onChange={(e) => dispatch({ type: "email", value: e.target.value })} value={state.email.value || ""} required />
      {state.email.hasErrors ? <ErrorMessage message={"E-MAIL IS NOT VALID"} /> : ""}
    </>
  );
}

export default Email;
