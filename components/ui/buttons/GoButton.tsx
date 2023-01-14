import { ButtonClassCSS } from "models/Buttons";
import { FormEvent } from "react";
import styles from "styles/ui/GoButton.module.css";

interface GoButtonProps {
  text: string;
  cssClass?: ButtonClassCSS;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  onClick?: () => void | Promise<void> | ((e: FormEvent<HTMLFormElement>) => void);
}

function GoButton({ type, text, onClick, isDisabled, cssClass }: GoButtonProps): JSX.Element {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={isDisabled ? styles.button__disabled : styles[cssClass ?? "go_button"]}
    >
      {text}
    </button>
  );
}

export default GoButton;
