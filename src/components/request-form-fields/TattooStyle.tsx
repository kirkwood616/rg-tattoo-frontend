import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectTattooStyle from "components/modals/SelectTattooStyle";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";

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
        readOnly
      />
      <FormErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} name={"tattooStyle"} />
      {isStyleActive && <SelectTattooStyle isStyleActive={isStyleActive} setIsStyleActive={setIsStyleActive} />}
    </>
  );
}

export default TattooStyle;
