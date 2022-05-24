import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import ErrorMessage from "../ErrorMessage";
import FormErrorMessage from "./FormErrorMessage";

function TattooPlacement() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <label htmlFor="tattooPlacement" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Tattoo Placement:
      </label>
      <input
        type="text"
        name="tattooPlacement"
        id="tattooPlacement"
        maxLength={30}
        onChange={(e) => dispatch({ type: "tattooPlacement", value: e.target.value })}
        value={state.tattooPlacement.value}
        disabled={isTextDisabled(state, "tattooPlacement")}
      />
      <FormErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} name={"tattooPlacement"} />
    </>
  );
}

export default TattooPlacement;
