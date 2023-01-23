import TitleHeading from "components/ui/title-heading/TitleHeading";

export default function Style() {
  return (
    <div className="Explain">
      <p>
        If you are unsure of what style to choose from, please select one that is the closest description of your desired
        tattoo and then explain in more detail in the Tattoo Description section of the form.
      </p>

      <TitleHeading>
        <h2>LINEWORK</h2>
      </TitleHeading>
      <span>IMAGE REFERENCE HERE</span>
      <p>
        Linework is a tattoo made only with lines/a lining needle. This can range from simple outlines to works which are
        very developed and &quot;shaded&quot; with lots of little lines in order to create a more dimensional piece. The
        linework can be delicate or bold depending on preference.
      </p>

      <TitleHeading>
        <h2>BLACK AND GRAY</h2>
      </TitleHeading>
      <span>IMAGE REFERENCE HERE</span>
      <p>
        Black & Gray tattoo styles are the oldest body art types. The style uses black ink to create a tattoo, with areas of
        skin used for highlights as well as gray ink for shading or contrast.
      </p>

      <TitleHeading>
        <h2>COLOR</h2>
      </TitleHeading>
      <span>IMAGE REFERENCE HERE</span>
      <p>
        Color is a tattoo containing at least 1 color other than black and/or gray ink. A color tattoo can include black
        and/or gray ink and up to several colored inks, or only colored ink(s) as part of the design.
      </p>

      <TitleHeading>
        <h2>LETTERING</h2>
      </TitleHeading>
      <span>IMAGE REFERENCE HERE</span>
      <p>
        Lettering is for a tattoo that only contains text letters, words or phrases. Lettering can be 1 to several colors
        present in the overall design.
      </p>
    </div>
  );
}
