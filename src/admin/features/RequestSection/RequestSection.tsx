import { ReactNode, useState } from "react";
import "./RequestSection.css";

interface Props {
  title: string;
  children: ReactNode;
}

function RequestSection({ title, children }: Props) {
  const [isSectionActive, setIsSectionActive] = useState(true);

  return (
    <div className="RequestSection">
      <div className="request-section_title" onClick={() => setIsSectionActive((current) => !current)}>
        {title}
      </div>
      <div
        className={isSectionActive ? "section_container active" : "section_container inactive"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default RequestSection;
