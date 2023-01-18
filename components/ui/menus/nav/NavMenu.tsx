import { Dispatch, SetStateAction } from "react";
import styles from "styles/ui/NavMenu.module.css";
import { toggleBooleanState } from "utils/Toggle";
import MenuHamburger from "./MenuHamburger";

interface NavMenuProps {
  isMenuActive: boolean;
  setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function NavMenu({ isMenuActive, setIsMenuActive }: NavMenuProps) {
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
      </div>
    </div>
  );
}
