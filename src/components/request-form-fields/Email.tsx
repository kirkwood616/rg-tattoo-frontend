import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import RequestContext from "../../context/RequestContext";
import { validateEmail } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  emailError: boolean;
  setEmailError: Dispatch<SetStateAction<boolean>>;
}

function Email({ emailError, setEmailError }: Props) {
  // CONTEXT
  let { email, setEmail } = useContext(RequestContext);

  useEffect(() => {
    if (email) {
      const delay = setTimeout(() => validateEmail(email, setEmailError), 800);
      return () => clearTimeout(delay);
    }
  }, [email, setEmailError]);

  return (
    <>
      <span className="label">
        <label htmlFor="email">Email:</label>
      </span>
      <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
      {emailError ? <ErrorMessage message={"E-MAIL IS NOT VALID"} /> : ""}
    </>
  );
}

export default Email;
