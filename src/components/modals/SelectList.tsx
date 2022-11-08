import RequestContext from "context/RequestContext";
import { Dispatch, SetStateAction, useContext } from "react";
import ModalWindow from "./ModalWindow";
import "./SelectList.css";

type SelectAction = "budget" | "tattooStyle" | "appointmentTime";

interface Props {
  isSelectActive: boolean;
  setIsSelectActive: Dispatch<SetStateAction<boolean>>;
  selectList: string[];
  actionType?: SelectAction;
  selectFunction?: (arg: string) => void;
  formatter?: (arg: string) => string;
}

function SelectList({ isSelectActive, setIsSelectActive, selectList, actionType, selectFunction, formatter }: Props) {
  const { dispatch } = useContext(RequestContext);

  function onSelectClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (actionType) dispatch({ type: actionType, value: e.currentTarget.value });
    if (selectFunction) selectFunction(e.currentTarget.value);
    setIsSelectActive((current) => !current);
  }
  return (
    <ModalWindow isActive={isSelectActive} setIsActive={setIsSelectActive}>
      <div className="select_container">
        {selectList.map((item, index) => (
          <button value={item} key={item + index} className="select-option" onClick={(e) => onSelectClick(e)}>
            {formatter ? formatter(item) : item}
          </button>
        ))}
      </div>
    </ModalWindow>
  );
}

export default SelectList;
