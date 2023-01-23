import TitleHeading from "components/ui/title-heading/TitleHeading";

export default function Budget() {
  return (
    <div className="Budget">
      <TitleHeading>
        <h2>BUDGET</h2>
      </TitleHeading>
      <p>
        Select a budget range that best represents the ammount you would like to spend on the tattoo you&apos;re requesting.
      </p>
      <p>
        If you would like to include further details pertaining to your budget, please provide them in the Tattoo Description
        section of the form.
      </p>
    </div>
  );
}
