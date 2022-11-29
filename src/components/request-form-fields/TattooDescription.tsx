import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function TattooDescription() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="tattooDescription" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Tattoo Description:
      </label>
      <textarea
        name="tattooDescription"
        id="tattooDescription"
        className="request_textarea"
        placeholder="Enter a description..."
        onChange={(e) => dispatch({ type: "tattooDescription", value: e.target.value })}
        value={state.tattooDescription.value}
        minLength={7}
      />
      <FormErrorMessage message={"MUST BE AT LEAST 7 CHARACTERS"} name={"tattooDescription"} />
    </section>
  );
}

export default TattooDescription;
