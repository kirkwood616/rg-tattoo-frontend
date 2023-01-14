import ModalWindow from "components/ui/modals/ModalWindow";
import { ReactNode, useState } from "react";
import styles from "styles/features/ExplainInfo.module.css";
import { toggleBooleanState } from "utils/Toggle";

interface ExplainInfoProps {
  children: ReactNode;
}

export default function ExplainInfo({ children }: ExplainInfoProps) {
  const [isExplainActive, setIsExplainActive] = useState<boolean>(false);

  return (
    <>
      <button type="button" className={styles.ExplainInfo} onClick={() => toggleBooleanState(setIsExplainActive)}>
        <svg version="1.1" viewBox="0 0 203 203" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <g>
                <g>
                  <path
                    className="st0"
                    d="M101,5C47.7,5.3,4.7,48.7,5,102c0.3,53.3,43.7,96.3,97,96c53.3-0.3,96.3-43.7,96-97
					C197.7,47.7,154.3,4.7,101,5z M101.9,182.3c-44.6,0.2-80.9-35.7-81.2-80.4c-0.2-44.6,35.7-81,80.3-81.2
					c44.6-0.2,81,35.8,81.2,80.3C182.5,145.7,146.5,182,101.9,182.3z M116.2,143.7l-0.4-72.1l-37.2,0.2l0.1,15.8l10.1-0.1l0.3,56.3
					l-10.7,0l0.1,15.1l46.7-0.3l-0.1-15.1L116.2,143.7z M102,60.9c9.1,0,14.6-6.1,14.6-13.6c-0.2-7.7-5.6-13.5-14.4-13.5
					c-8.7,0.1-14.4,6-14.4,13.7C87.9,55,93.4,61,102,60.9z"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </button>
      {isExplainActive && <ModalWindow closeFunction={() => toggleBooleanState(setIsExplainActive)}>{children}</ModalWindow>}
    </>
  );
}
