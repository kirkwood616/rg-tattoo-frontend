import FormErrorMessage from "components/errors/FormErrorMessage";
import InfoExplain from "components/features/Explain/Explain";
import RequestContext from "context/RequestContext";
import { useContext } from "react";
import * as Explain from "../features/Explain";

function TattooPlacement() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="tattooPlacement">Tattoo Placement:</label>
        <InfoExplain children={<Explain.Placement />} />
      </div>
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
