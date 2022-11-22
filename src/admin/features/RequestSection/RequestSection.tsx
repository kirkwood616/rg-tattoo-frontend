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
    <section className="RequestSection">
      <div className="request-section_title" onClick={() => setIsSectionActive((current) => !current)}>
        {title}
      </div>
      <CSSTransition
        in={isSectionActive}
        timeout={200}
        classNames="request-section_container"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="request-section_container">
          {children}
        </div>
      </CSSTransition>
    </section>
  );
}

export default RequestSection;
