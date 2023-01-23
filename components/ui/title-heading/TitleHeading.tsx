import { ReactNode } from "react";
import styles from "styles/ui/TitleHeading.module.css";

interface TitleHeadingProps {
  children: ReactNode;
}

export default function TitleHeading({ children }: TitleHeadingProps) {
  return <div className={styles.TitleHeading}>{children}</div>;
}
