import { ReactNode, useEffect } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

function AdminPage({ children, title }: Props) {
  useEffect(() => {
    document.title = `${title} | Rack Ruin`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <section className="admin-section" style={{ width: "100%" }}>
      {children}
    </section>
  );
}

export default AdminPage;
