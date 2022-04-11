import { useContext, useEffect } from "react";
import RequestContext from "../../context/RequestContext";
import { validatePhone } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

function PhoneNumber() {
  // CONTEXT
  let { phoneNumber, setPhoneNumber, state, dispatch } = useContext(RequestContext);

  useEffect(() => {
    if (phoneNumber) {
      const delay = setTimeout(() => {
        if (phoneNumber && phoneNumber.length < 14) {
          dispatch({ type: "phone", value: true });
        }
        if (phoneNumber.length === 14) {
          dispatch({ type: "phone", value: false });
        }
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [phoneNumber, dispatch]);

  return (
    <>
      <span className="label">
        <label htmlFor="tel">Phone:</label>
      </span>
      <input type="tel" name="tel" id="tel" onChange={(e) => validatePhone(e, setPhoneNumber)} value={phoneNumber} required />
      {state.phoneError ? <ErrorMessage message={"PHONE NUMBER IS NOT VALID"} /> : ""}
    </>
  );
}

export default PhoneNumber;
