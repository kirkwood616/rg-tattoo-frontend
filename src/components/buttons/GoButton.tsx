import "./GoButton.css";

interface Props {
  type: "submit" | "reset" | "button";
  text: string;
  backgroundColor: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

function GoButton({ type, text, backgroundColor, onClick, isDisabled }: Props): JSX.Element {
  return (
    <button type={type} onClick={onClick} className="go-button" style={{ backgroundColor: backgroundColor }} disabled={isDisabled}>
      {text}
    </button>
  );
}

export default GoButton;
