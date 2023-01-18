import { ReactNode } from "react";
import styles from "styles/ui/Field.module.css";

interface FieldProps {
  children: ReactNode;
}

export default function Field({ children }: FieldProps) {
  return <section className={styles.Field}>{children}</section>;
}
