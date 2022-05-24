import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

function TattooDescription() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="tattooDescription" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Tattoo Description:
      </label>
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        onChange={(e) => dispatch({ type: "tattooDescription", value: e.target.value })}
        value={state.tattooDescription.value}
        minLength={7}
        disabled={isTextDisabled(state, "tattooDescription")}
      />
      <FormErrorMessage message={"MUST BE AT LEAST 7 CHARACTERS"} name={"tattooDescription"} />
    </>
  );
}

export default TattooDescription;
