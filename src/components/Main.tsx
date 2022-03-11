// import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="Main">
      <Link to={"/request-appointment"}>Request</Link>
    </div>
  );
}

export default Main;
