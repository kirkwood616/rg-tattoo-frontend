import styles from "styles/ui/Header.module.css";
import NavMenu from "../menus/nav/NavMenu";

export default function Header() {
  return (
    <div className={styles.Header}>
      <span className={styles.site_title}>rackxruin</span>
      <NavMenu />
    </div>
  );
}
