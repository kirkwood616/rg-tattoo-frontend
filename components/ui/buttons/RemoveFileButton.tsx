import styles from "styles/ui/RemoveFileButton.module.css";

interface RemoveFileButtonProps {
  onClick: () => void;
}

export default function RemoveFileButton({ onClick }: RemoveFileButtonProps) {
  return (
    <button type="button" onClick={onClick} className={styles.RemoveFileButton}>
      Remove File
    </button>
  );
}
