import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import FormErrorMessage from "./FormErrorMessage";

function LastName() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="lastName" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Last Name:
      </label>
      <input type="text" name="lastName" id="lastName" onChange={(e) => dispatch({ type: "lastName", value: e.target.value })} value={state.lastName.value} />
      <FormErrorMessage message={"LAST NAME REQUIRED"} name={"lastName"} />
    </>
  );
}

export default LastName;
