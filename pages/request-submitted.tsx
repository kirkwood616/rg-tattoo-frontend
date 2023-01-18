import GoButton from "components/ui/buttons/GoButton";
import { useRouter } from "next/router";
import styles from "styles/pages/RequestSubmitted.module.css";

function RequestSubmitted() {
  const router = useRouter();

  return (
    <div className={styles.RequestSubmitted}>
      <h1>Request Submitted</h1>
      <p>Your request has been submitted. You will receive a confirmation email with the details you have submitted.</p>
      <GoButton text="Back To Home" cssClass="button__primary" onClick={() => router.push("/")} />
    </div>
  );
}

export default RequestSubmitted;
