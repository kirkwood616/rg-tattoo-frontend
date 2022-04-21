import "./SelectTattooStyle.css";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { tattooStyles } from "../../admin/AdminSettings";
import RequestContext from "../../context/RequestContext";
import ModalWindow from "./ModalWindow";

interface Props {
  isStyleActive: boolean;
  setIsStyleActive: Dispatch<SetStateAction<boolean>>;
}

function SelectTattooStyle({ isStyleActive, setIsStyleActive }: Props) {
  // CONTEXT
  let { dispatch } = useContext(RequestContext);

  function onStyleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch({ type: "tattooStyle", value: e.currentTarget.value });
    setIsStyleActive(false);
  }

  return (
    <ModalWindow isActive={isStyleActive} setIsActive={setIsStyleActive} className="style-select_container">
      {tattooStyles.map((style, index) => (
        <button value={style} key={index} className="style-option" onClick={(e) => onStyleClick(e)}>
          {style}
        </button>
      ))}
    </ModalWindow>
  );
}

export default SelectTattooStyle;
