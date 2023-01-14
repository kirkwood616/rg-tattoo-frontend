import Image from "next/image";
import styles from "styles/ui/FetchError.module.css";

interface FetchErrorProps {
  fetchError: Error;
}

function FetchError({ fetchError }: FetchErrorProps) {
  return (
    <div className={styles.FetchError}>
      <div className={styles.image__container}>
        <Image src={"/errors/rackxruin_error.svg"} alt={"error"} className={styles.image} height={13} width={13} />
      </div>
      <h1>{fetchError.message}</h1>
    </div>
  );
}

export default FetchError;
