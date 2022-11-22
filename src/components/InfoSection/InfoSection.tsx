import { FieldValues } from "models/RequestReducer";
import "./InfoSection.css";

interface Props {
  title: string;
  body: FieldValues["value"] | JSX.Element;
}

function InfoSection({ title, body }: Props) {
  return (
    <section className="InfoSection">
      <div className="info-section_title">{title}</div>
      <div className="info-section_body">{body}</div>
    </section>
  );
}

export default InfoSection;
