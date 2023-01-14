import Layout from "components/layouts/Layout";
import AppContextProvider from "context/AppContextProvider";
import type { AppProps } from "next/app";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
