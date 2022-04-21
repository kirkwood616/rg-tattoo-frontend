import "./RemoveButton.css";

interface Props {
  index: number;
  onClick: (index: number) => void;
}

function RemoveButton({ index, onClick }: Props) {
  return (
    <svg className="close-svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 500 500" onClick={() => onClick(index)}>
      <path
        d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M327.115,365.904
			L256,294.789l-71.115,71.115l-38.789-38.789L217.211,256l-71.115-71.115l38.789-38.789L256,217.211l71.115-71.115l38.789,38.789
			L294.789,256l71.115,71.115L327.115,365.904z"
      />
    </svg>
  );
}

export default RemoveButton;
