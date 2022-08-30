import { useContext } from "react";
import RequestContext from "../../context/RequestContext";
import FormErrorMessage from "../errors/FormErrorMessage";

function TattooDescription() {
  // CONTEXT
  const { state, dispatch } = useContext(RequestContext);

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
      />
      <FormErrorMessage message={"MUST BE AT LEAST 7 CHARACTERS"} name={"tattooDescription"} />
    </>
  );
}

export default TattooDescription;
