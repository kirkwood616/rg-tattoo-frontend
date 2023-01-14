import ModalWindow from "components/ui/modals/ModalWindow";
import RequestContext from "context/RequestContext";
import { Dispatch, SetStateAction, useContext } from "react";
import styles from "styles/ui/SelectList.module.css";
import { toggleBooleanState } from "utils/Toggle";

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
    toggleBooleanState(setIsSelectActive);
  }
  return (
    <ModalWindow setIsActive={setIsSelectActive}>
      <div className={styles.SelectList}>
        {!selectList.length && (
          <button className={styles.select_option__button} onClick={() => toggleBooleanState(setIsSelectActive)}>
            None Available
          </button>
        )}
        {selectList &&
          selectList.map((item, index) => (
            <button
              value={item}
              key={item + index}
              className={styles.select_option__button}
              onClick={(e) => onSelectClick(e)}
            >
              {formatter ? formatter(item) : item}
            </button>
          ))}
      </div>
    </ModalWindow>
  );
}

export default SelectList;
