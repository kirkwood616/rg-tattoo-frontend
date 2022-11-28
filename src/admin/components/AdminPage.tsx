import { ReactNode, useEffect } from "react";
import "./AdminPage.css";

interface Props {
  title: string;
  children: ReactNode;
}

function AdminPage({ children, title }: Props) {
  useEffect(() => {
    document.title = `${title} | Rack Ruin`;
    window.scrollTo(0, 0);
  }, [title]);

  return <section className="admin-section">{children}</section>;
}

export default AdminPage;
