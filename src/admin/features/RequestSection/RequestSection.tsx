import { ReactNode, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./RequestSection.css";

interface Props {
  title: string;
  children: ReactNode;
}

function RequestSection({ title, children }: Props) {
  const [isSectionActive, setIsSectionActive] = useState(true);
  const nodeRef = useRef(null);

  return (
    <div className="RequestSection">
      <div className="request-section_title" onClick={() => setIsSectionActive((current) => !current)}>
        {title}
      </div>
      <CSSTransition in={isSectionActive} timeout={200} classNames="section_container" unmountOnExit nodeRef={nodeRef}>
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </div>
  );
}

export default RequestSection;
