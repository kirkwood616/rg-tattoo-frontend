import "./GoButton.css";

interface Props {
  type: "submit" | "reset" | "button";
  text: string;
  backgroundColor: string;
  onClick?: () => void;
}

function GoButton({ type, text, backgroundColor, onClick }: Props): JSX.Element {
  return (
    <button type={type} onClick={onClick} className="go-button" style={{ backgroundColor: backgroundColor }}>
      {text}
    </button>
  );
}

export default GoButton;
