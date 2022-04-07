import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import RequestContext from "../../context/RequestContext";
import { validatePhone } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  phoneError: boolean;
  setPhoneError: Dispatch<SetStateAction<boolean>>;
}

function PhoneNumber({ phoneError, setPhoneError }: Props) {
  // CONTEXT
  let { phoneNumber, setPhoneNumber } = useContext(RequestContext);

  useEffect(() => {
    if (phoneNumber) {
      const delay = setTimeout(() => {
        if (phoneNumber && phoneNumber.length < 14) {
          setPhoneError(true);
        }
        if (phoneNumber.length === 14) {
          setPhoneError(false);
        }
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [phoneNumber, setPhoneError]);

  return (
    <>
      <span className="label">
        <label htmlFor="tel">Phone:</label>
      </span>
      <input type="tel" name="tel" id="tel" onChange={(e) => validatePhone(e, setPhoneNumber)} value={phoneNumber} required />
      {phoneError ? <ErrorMessage message={"PHONE NUMBER IS NOT VALID"} /> : ""}
    </>
  );
}

export default PhoneNumber;
