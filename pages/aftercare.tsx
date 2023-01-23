import TitleHeading from "components/ui/title-heading/TitleHeading";
import Head from "next/head";

function Aftercare() {
  return (
    <>
      <Head>
        <title>Aftercare | Rack x Ruin</title>
        <meta name="description" content="rack x ruin | Aftercare instructions for your new tattoo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rackxruin_favicon.ico" />
      </Head>
      <div className="Aftercare">
        <TitleHeading>
          <h1>AFTERCARE</h1>
        </TitleHeading>
      </div>
    </>
  );
}

export default Aftercare;
