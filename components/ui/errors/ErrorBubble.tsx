import styles from "styles/ui/ErrorBubble.module.css";

interface ErrorBubbleProps {
  errorMessage: string;
}

export default function ErrorBubble({ errorMessage }: ErrorBubbleProps) {
  return <div className={styles.ErrorBubble}>{errorMessage}</div>;
}
