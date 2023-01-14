import styles from "styles/features/InfoSection.module.css";

interface Props {
  title: string;
  body: string | number | JSX.Element;
}

function InfoSection({ title, body }: Props) {
  return (
    <section className={styles.InfoSection}>
      <div className={styles.info_section__title}>{title}</div>
      <div className={styles.info_section__body}>{body}</div>
    </section>
  );
}

export default InfoSection;
