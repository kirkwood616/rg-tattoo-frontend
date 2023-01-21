import styles from "styles/ui/Loading.module.css";
import Skull from "../logos/Skull";

export default function Loading() {
  return (
    <div className={styles.Loading}>
      <Skull />
      <div className="loading_text__container">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
}
