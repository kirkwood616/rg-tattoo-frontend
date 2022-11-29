import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function TattooPlacement() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
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
    </section>
  );
}

export default TattooPlacement;
