import Link from "next/link";
import styles from "styles/ui/MenuList.module.css";

export default function UserMenu() {
  return (
    <menu className={styles.MenuList}>
      <li>
        <Link href="/">HOME</Link>
      </li>
      <li>
        <Link href="/about">ABOUT</Link>
      </li>
      <li>
        <Link href="/request-appointment">REQUEST APPOINTMENT</Link>
      </li>
      <li>
        <Link href="/aftercare">AFTERCARE</Link>
      </li>
    </menu>
  );
}
