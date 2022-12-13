import { tattooStyles } from "admin/settings/AdminSettings";
import FormErrorMessage from "components/errors/FormErrorMessage";
import SelectList from "components/modals/SelectList";
import AppContext from "context/AppContext";
import RequestContext from "context/RequestContext";
import { useContext, useState } from "react";

function TattooStyle() {
  const [isStyleActive, setIsStyleActive] = useState<boolean>(false);
  const { toggleModalOpen } = useContext(AppContext);
  const { state } = useContext(RequestContext);

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="style-picker">Tattoo Style:</label>
      </div>

      <input
        type="text"
        name="style-picker"
        id="style-picker"
        placeholder="--- Select Style ---"
        value={state.tattooStyle.value}
        onClick={() => toggleModalOpen(setIsStyleActive)}
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
    </section>
  );
}

export default TattooStyle;
