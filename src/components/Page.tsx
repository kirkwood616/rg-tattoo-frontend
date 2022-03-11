import { useEffect } from "react";

function Page({ children, title }: any) {
  useEffect(() => {
    document.title = `${title} | RG`;
    window.scrollTo(0, 0);
  }, [title]);
  return children;
}

export default Page;
