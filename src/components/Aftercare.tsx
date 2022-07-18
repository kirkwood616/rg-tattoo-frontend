import "./Aftercare.css";
import Page from "./Page";

function Aftercare() {
  return (
    <Page title="Aftercare Instructions">
      <div className="Aftercare">
        <h1>AFTERCARE INSTRUCTIONS</h1>
        <ul>
          <li>
            Remove bandage after an hour. If you are able to follow the next steps the bandage can remain on for up to six hours. If the bandage sticks to the tattoo rinse it
            with warm water until it comes loose. <span className="do-not">Do not rebandage.</span>
          </li>
          <li>
            Wash your tattoo gently with warm water and a mild soap. Lather with clean hands then apply soap directly to the tattoo. Antibacterial soap can be used but
            typically not recommended.
          </li>
          <li>
            Pat dry and let your new tattoo breath for about ten minutes or so. Then apply a <u>very thin layer</u> of Aquaphor or A&D three or four times a day for{" "}
            <u>only three days</u>. Then switch to a fragrance free, dye free hand lotion (i.e. Curel Ultra Healing, Eucerin, Lubriderm) <u>Apply a thin layer</u> to
            moisturize the skin as you normally would. If the tattoo feels dry and tight apply a little more.
          </li>
          <li>Continue with the hand lotion until the tattoo is completely healed, typically 30 days.</li>
          <li>
            <span className="do-not">DO NOT!</span> Pick or scratch at the tattoo. You could create scarring and dirty fingers may cause an infection.
          </li>
          <li>
            <span className="do-not">DO NOT!</span> Go swimming in chlorine or salt water for at least two weeks.
          </li>
          <li>
            <span className="do-not">DO NOT!</span> Go in direct sunlight or apply sun block until the tattoo is completely healed.
          </li>
          <li>
            <span className="do-not">DO NOT!</span> Wear clothing that will be tight and abrasive for a healing tattoo.
          </li>
          <li>
            <span className="do-not">REMEMBER!</span> Your new tattoo was applied using sterile equipment and procedures. Infections occur outside the studio. It is your
            responsibility to take care of your tattoo. Following these instructions will minimize the risk of any complications.
          </li>
        </ul>
        <div className="important">
          Symptoms of an infection are redness, swelling, hot or warm to the touch, red streaks, yellow or green pus. If any of these symptoms are present a few days after
          your tattoo is done, it is recommended you contact your doctor.
        </div>
        <div className="important">
          Individuals may be able to donate blood within the standard deferral period if the individual presents a copy of his/hers body art facility's client record to the
          blood donor facility, based on blood donor policy.
        </div>
      </div>
    </Page>
  );
}

export default Aftercare;
