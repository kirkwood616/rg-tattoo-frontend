// import "./UserMenu.css";

import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <ul>
      <li>
        <Link to={"/"}>HOME</Link>
      </li>
      <li>
        <Link to={"/about"}>ABOUT</Link>
      </li>
      <li>
        <Link to={"/request-appointment"}>REQUEST APPOINTMENT</Link>
      </li>
      <li>
        <Link to={"/aftercare"}>AFTERCARE</Link>
      </li>
    </ul>
  );
}

export default UserMenu;
