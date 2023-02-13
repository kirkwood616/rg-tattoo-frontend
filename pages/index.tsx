import TitleHeading from "components/ui/title-heading/TitleHeading";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rack x Ruin | Reuben Garcia</title>
        <meta name="description" content="rack x ruin | Official website of tattoo artist Reuben Garcia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rackxruin_favicon.ico" />
      </Head>
      <main>
        <TitleHeading>
          <h1>LANDING PAGE</h1>
        </TitleHeading>
      </main>
    </>
  );
}
