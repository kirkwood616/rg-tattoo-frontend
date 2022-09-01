import NavMenu from "components/menu/NavMenu";
import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <span className="site-title">rackxruin</span>
      <NavMenu />
    </div>
  );
}

export default Header;
