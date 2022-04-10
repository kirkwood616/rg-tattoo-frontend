import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import RequestContext from "../../context/RequestContext";
import { validateEmail } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function Email() {
  // CONTEXT
  let { email, setEmail, state, dispatch } = useContext(RequestContext);

  useEffect(() => {
    if (email) {
      const delay = setTimeout(() => validateEmail(email, dispatch), 800);
      return () => clearTimeout(delay);
    }
  }, [email, dispatch]);

  return (
    <>
      <span className="label">
        <label htmlFor="email">Email:</label>
      </span>
      <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      {state.emailError ? <ErrorMessage message={"E-MAIL IS NOT VALID"} /> : ""}
    </>
  );
}

export default Email;
