import { useContext, useState } from "react";
import RequestContext from "../../context/RequestContext";
import ErrorMessage from "../ErrorMessage";
import SelectTattooStyle from "../modals/SelectTattooStyle";

function TattooStyle() {
  // CONTEXT
  let { state } = useContext(RequestContext);

  // STATE
  const [isStyleActive, setIsStyleActive] = useState<boolean>(false);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooStyle">Tattoo Style:</label>
      </span>
      <input
        type="text"
        name="style-picker"
        id="style-picker"
        placeholder="--- Select Style ---"
        value={state.tattooStyle.value}
        onClick={() => setIsStyleActive(true)}
        readOnly
      />
      <ErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} name={"tattooStyle"} />
      {isStyleActive ? <SelectTattooStyle isStyleActive={isStyleActive} setIsStyleActive={setIsStyleActive} /> : ""}
    </>
  );
}

export default TattooStyle;
