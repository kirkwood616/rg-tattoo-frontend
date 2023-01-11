import { useState } from "react";
import styles from "styles/ui/NavMenu.module.css";
import { toggleBooleanState } from "utils/Toggle";
import MenuHamburger from "./MenuHamburger";
import MenuList from "./MenuList";

export default function NavMenu() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  return (
    <div className={styles.NavMenu}>
      <div
        className={isMenuActive ? styles.menu_click_background : ""}
        onClick={() => toggleBooleanState(setIsMenuActive)}
      ></div>
      <div className={styles.nav__container}>
        <button
          onClick={() => toggleBooleanState(setIsMenuActive)}
          className={isMenuActive ? styles.menu_trigger__active : styles.menu_trigger}
        >
          <MenuHamburger isActive={isMenuActive} />
        </button>
        <nav
          onClick={() => toggleBooleanState(setIsMenuActive)}
          className={isMenuActive ? `${styles.nav} ${styles.nav__active}` : styles.nav}
        >
          <MenuList />
        </nav>
      </div>
    </div>
  );
}
