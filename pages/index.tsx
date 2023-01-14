import { Inter } from "@next/font/google";
import ExplainInfo from "components/ui/explain-info/ExplainInfo";
import ModalWindow from "components/ui/modals/ModalWindow";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [bool, setBool] = useState(false);

  return (
    <>
      <Head>
        <title>Rack x Ruin | Reuben Garcia</title>
        <meta name="description" content="rack x ruin | Official website of tattoo artist Reuben Garcia." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/rackxruin_favicon.ico" />
      </Head>
      <main>
        <h1>LANDING PAGE</h1>
        {/* <LoadingDots /> */}
        {/* <FetchError fetchError={new Error("FUCKING ERROR")} /> */}
        <button onClick={() => setBool((prev) => !prev)}>COWARD</button>
        {bool && (
          <ModalWindow setIsActive={setBool}>
            <h1>FUCK</h1>
            <h2>SHIT</h2>
          </ModalWindow>
        )}
        <ExplainInfo>HEY</ExplainInfo>
      </main>
    </>
  );
}
