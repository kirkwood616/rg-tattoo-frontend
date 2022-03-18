import "./GoButton.css";

interface Props {
  type: "submit" | "reset" | "button";
  text: string;
  onClick: () => void;
}

function GoButton({ type, text, onClick }: Props): JSX.Element {
  return (
    <button type={type} onClick={onClick} className="go-button">
      {text}
    </button>
  );
}

export default GoButton;
