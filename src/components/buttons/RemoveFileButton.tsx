import "./RemoveFileButton.css";

interface Props {
  onClick: () => void;
}

function RemoveFileButton({ onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="remove-file-button">
      REMOVE FILE
    </button>
  );
}

export default RemoveFileButton;
