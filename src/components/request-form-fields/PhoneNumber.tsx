import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";

function PhoneNumber() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="phoneNumber">Phone:</label>
      </span>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        onChange={(e) => dispatch({ type: "phoneNumber", value: e.target.value })}
        value={state.phoneNumber.value || ""}
        required
      />
      <ErrorMessage message={"PHONE NUMBER IS NOT VALID"} name={"phoneNumber"} />
    </>
  );
}

export default PhoneNumber;
