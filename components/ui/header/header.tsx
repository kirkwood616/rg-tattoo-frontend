import { useState } from "react";
import styles from "styles/ui/Header.module.css";
import { toggleBooleanState } from "utils/Toggle";
import MenuList from "../menus/nav/MenuList";
import NavMenu from "../menus/nav/NavMenu";

export default function Header() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <div className={styles.Header}>
      <div className={styles.header_items__container}>
        <div className={styles.site_title}>rackxruin</div>
        <NavMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} />
      </div>
      <nav
        onClick={() => toggleBooleanState(setIsMenuActive)}
        className={isMenuActive ? `${styles.nav} ${styles.nav__active}` : styles.nav}
      >
        <MenuList />
      </nav>
    </div>
  );
}
