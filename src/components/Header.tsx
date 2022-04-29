import "./Header.css";
import NavMenu from "./menu/NavMenu";

function Header() {
  return (
    <div className="Header">
      <span className="rack-ruin">rack&ruin</span>
      <NavMenu />
    </div>
  );
}

export default Header;
