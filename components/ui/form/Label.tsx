import { ReactNode } from "react";
import styles from "styles/ui/Label.module.css";
import { formatCamelToTitle } from "utils/Formatting";

interface LabelProps {
  labelID: string;
  children?: ReactNode;
}

export default function Label({ labelID, children }: LabelProps) {
  return (
    <div className={styles.Label}>
      <label htmlFor={labelID}>{formatCamelToTitle(labelID)}:</label>
      {children && children}
    </div>
  );
}
