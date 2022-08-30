import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function PhoneNumber() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="phoneNumber" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Phone:
      </label>
      <input type="tel" name="phoneNumber" id="phoneNumber" onChange={(e) => dispatch({ type: "phoneNumber", value: e.target.value })} value={state.phoneNumber.value} />
      <FormErrorMessage message={"PHONE NUMBER IS NOT VALID"} name={"phoneNumber"} />
    </>
  );
}

export default PhoneNumber;
