import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import FormErrorMessage from "./FormErrorMessage";

function TattooPlacement() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

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
      />
      <FormErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} name={"tattooPlacement"} />
    </>
  );
}

export default TattooPlacement;
