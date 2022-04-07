import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "../Page.css";

interface Props {
  title: string;
  children: ReactNode;
}

function AdminPage({ children, title }: Props) {
  // CONTEXT
  let { user } = useContext(AppContext);

  // NAVIGATE
  let navigate = useNavigate();

  useEffect(() => {
    document.title = `${title} | Rack Ruin`;
    if (!user) navigate("/login");
    const delay = setTimeout(() => window.scrollTo(0, 0), 700);
    return () => clearTimeout(delay);
  }, [navigate, title, user]);

  return <section className="section">{children}</section>;
}

export default AdminPage;
