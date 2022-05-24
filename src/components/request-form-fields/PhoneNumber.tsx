import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

function PhoneNumber() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="phoneNumber" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Phone:
      </label>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        onChange={(e) => dispatch({ type: "phoneNumber", value: e.target.value })}
        value={state.phoneNumber.value}
        disabled={isTextDisabled(state, "phoneNumber")}
      />
      <FormErrorMessage message={"PHONE NUMBER IS NOT VALID"} name={"phoneNumber"} />
    </>
  );
}

export default PhoneNumber;
