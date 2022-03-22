import "./RemoveButton.css";

interface Props {
  index: number;
  onClick: (index: number) => void;
}

function RemoveButton({ index, onClick }: Props) {
  return (
    <button type="button" className="remove-button" onClick={() => onClick(index)}>
      X
    </button>
  );
}

export default RemoveButton;
