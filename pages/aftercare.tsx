import Bandage from "components/ui/icons/bandage";
import Soap from "components/ui/icons/Soap";
import Topical from "components/ui/icons/Topical";
import Warning from "components/ui/icons/Warning";
import TitleHeading from "components/ui/title-heading/TitleHeading";
import Head from "next/head";
import styles from "styles/pages/Aftercare.module.css";

function Aftercare() {
  return (
    <>
      <Head>
        <title>Aftercare | Rack x Ruin</title>
        <meta name="description" content="rack x ruin | Aftercare instructions for your new tattoo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rackxruin_favicon.ico" />
      </Head>
      <div className={styles.Aftercare}>
        <TitleHeading>
          <h1>AFTERCARE</h1>
        </TitleHeading>

        <div className={styles.instructions__container}>
          <div className={styles.instructions_image}>
            <Bandage />
          </div>
          <div>
            <div className={styles.instructions_title}>
              <h2>BANDAGES</h2>
            </div>
            <div className={styles.instructions_description}>
              <p>
                Remove bandage after an hour. If you are able to follow the next steps the bandage can remain on for up to
                six hours. If the bandage sticks to the tattoo rinse it with warm water until it comes loose. Do not
                rebandage.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.instructions__container}>
          <div className={styles.instructions_image}>
            <Soap />
          </div>
          <div>
            <div className={styles.instructions_title}>
              <h2>WASHING</h2>
            </div>
            <div className={styles.instructions_description}>
              <p>
                Wash your tattoo gently with warm water and a mild soap. Antibacterial soap can be used but is typically not
                recommended. Unscented soap is preferred to avoid irritation. Lather with clean hands then apply soap
                directly to the tattoo.
              </p>
              <p>
                Pat dry your tattoo with a fresh paper towel. Do not wipe or pat dry with a towel. Let your washed tattoo
                breathe for 10 - 15 minutes before applying topicals.
              </p>
              <p>Repeat washing steps 2-3 times a day for 7-14 days.</p>
            </div>
          </div>
        </div>

        <div className={styles.instructions__container}>
          <div className={styles.instructions_image}>
            <Topical />
          </div>
          <div>
            <div className={styles.instructions_title}>
              <h2>TOPICALS</h2>
            </div>
            <div className={styles.instructions_description}>
              <p>
                After washing your new tattoo and after it is fully dried, apply a very thin layer of Aquaphor or A&D three
                or four times a day for only three days.
              </p>
              <p>
                After three days, switch to a fragrance free, dye free hand lotion (i.e. Curel Ultra Healing, Eucerin,
                Lubriderm). Apply a thin layer moisturize the skin as you normally would. If the tattoo feels dry and tight
                apply a little more.
              </p>
              <p>Continue with hand lotion until the tattoo is completely healed, typically 30 days.</p>
              <p>
                The sun&apos;s UV rays will fade your tattoo if exposed to excessive direct sunlight. After your tattoo is
                fully healed, it is recommended to apply a sunblock of SPF 50 or higher when your tattoo will be exposed to
                prolonged periods of direct sunlight.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.instructions__container}>
          <div className={styles.instructions_image}>
            <Warning />
          </div>
          <div>
            <div className={styles.instructions_title}>
              <h2>WARNINGS</h2>
            </div>
            <div className={styles.instructions_description}>
              <p>
                DO NOT: Pick or scratch at the tattoo. You could create scarring and dirty fingers may cause an infection.
              </p>
              <p>DO NOT: Go swimming in chlorine or salt water for at least two weeks.</p>
              <p>DO NOT: Go in direct sunlight or apply sun block until the tattoo is completely healed.</p>
              <p>DO NOT: Wear clothing that will be tight and abrasive for a healing tattoo.</p>
              <p>
                Your new tattoo was applied using sterile equipment and procedures. Infections occur outside the studio. It
                is your responsibility to take care of your tattoo. Following these instructions will minimize the risk of
                any complications.
              </p>
              <p>
                Symptoms of an infection are redness, swelling, hot or warm to the touch, red streaks, yellow or green pus.
                If any of these symptoms are present a few days after your tattoo is done, it is recommended you contact your
                doctor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aftercare;
