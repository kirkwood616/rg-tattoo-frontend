import Skull from "components/ui/logos/Skull";
import styles from "styles/ui/LoadingDots.module.css";

export default function LoadingDots() {
  return (
    <div className={styles.LoadingDots}>
      <Skull classes={styles.first} />
      <Skull classes={styles.second} />
      <Skull classes={styles.third} />
    </div>
  );
}
