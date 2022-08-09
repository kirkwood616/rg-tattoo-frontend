// import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import FormErrorMessage from "./FormErrorMessage";

function FirstName() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="firstName" className={state.appointmentTime.value ? "label" : "label disabled"}>
        First Name:
      </label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => dispatch({ type: "firstName", value: e.target.value })}
        value={state.firstName.value}
        disabled={isTextDisabled(state, "firstName")}
      />
      <FormErrorMessage message="FIRST NAME REQUIRED" name={"firstName"} />
    </>
  );
}

export default FirstName;
