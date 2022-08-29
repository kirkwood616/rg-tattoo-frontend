import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import { isTextDisabled } from "../../utils/DisabledField";
import SelectTattooStyle from "../modals/SelectTattooStyle";
import FormErrorMessage from "./FormErrorMessage";

function TattooStyle() {
  // CONTEXT
  const { state } = useContext(RequestContext);

  // STATE
  const [isStyleActive, setIsStyleActive] = useState<boolean>(false);

  return (
    <>
      <label htmlFor="tattooStyle" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Tattoo Style:
      </label>

      <input
        type="text"
        name="style-picker"
        id="style-picker"
        placeholder="--- Select Style ---"
        value={state.tattooStyle.value}
        onClick={() => setIsStyleActive(true)}
        disabled={isTextDisabled(state, "tattooStyle")}
        readOnly
      />
      <FormErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} name={"tattooStyle"} />
      {isStyleActive && <SelectTattooStyle isStyleActive={isStyleActive} setIsStyleActive={setIsStyleActive} />}
    </>
  );
}

export default TattooStyle;
