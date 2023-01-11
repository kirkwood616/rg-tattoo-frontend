import { Inter } from "@next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
        <h1>LANDING PAGE</h1>
      </main>
    </>
  );
}
