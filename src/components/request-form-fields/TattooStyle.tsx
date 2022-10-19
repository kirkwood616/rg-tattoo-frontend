import { tattooStyles } from "admin/settings/AdminSettings";
import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";

function TattooStyle() {
  const { state } = useContext(RequestContext);
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
      {isStyleActive && (
        <SelectList
          isSelectActive={isStyleActive}
          setIsSelectActive={setIsStyleActive}
          selectList={tattooStyles}
          actionType="tattooStyle"
        />
      )}
    </>
  );
}

export default TattooStyle;
