// import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { RequestReducer } from "../../models/RequestReducer";
import { StateFields } from "../../models/StateFields";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
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
