import Header from "components/ui/header/header";
import Loading from "components/ui/loading/Loading";
import AppContext from "context/AppContext";
import { ReactNode, useContext } from "react";
import styles from "styles/layouts/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoading } = useContext(AppContext);

  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <main className={styles.Layout}>{children}</main>
    </>
  );
}
