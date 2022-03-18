import { useEffect } from "react";
import "./Page.css";

function Page({ children, title }: any) {
  useEffect(() => {
    document.title = `${title} | Rack Ruin`;
    window.scrollTo(0, 0);
  }, [title]);
  return <section className="section">{children}</section>;
}

export default Page;
