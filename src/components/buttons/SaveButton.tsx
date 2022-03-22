import "./SaveButton.css";

interface Props {
  type: "submit" | "reset" | "button";
  text: string;
  onClick: () => void;
}

function SaveButton({ type, text, onClick }: Props) {
  return (
    <button type={type} onClick={onClick} className="save-button">
      {text}
    </button>
  );
}

export default SaveButton;
