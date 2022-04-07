import { ReactNode, useEffect } from "react";
import "./Page.css";

interface Props {
  title: string;
  children: ReactNode;
}

function Page({ children, title }: Props) {
  useEffect(() => {
    document.title = `${title} | Rack Ruin`;
    const delay = setTimeout(() => window.scrollTo(0, 0), 600);
    return () => clearTimeout(delay);
  }, [title]);
  return <section className="section">{children}</section>;
}

export default Page;
