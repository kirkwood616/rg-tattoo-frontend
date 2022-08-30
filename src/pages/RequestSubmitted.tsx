import GoButton from "components/buttons/GoButton";
import Page from "components/Page";
import { useNavigate } from "react-router-dom";
import "./RequestSubmitted.css";

function RequestSubmitted() {
  let navigate = useNavigate();
  return (
    <Page title="Request Submitted">
      <div className="RequestSubmitted">
        <h1>Request Submitted</h1>
        <p>Your request has been submitted. You will receive a confirmation email with the details you have submitted.</p>
        <GoButton type="button" text="Back To Home" backgroundColor="green" onClick={() => navigate("/")} />
      </div>
    </Page>
  );
}

export default RequestSubmitted;
