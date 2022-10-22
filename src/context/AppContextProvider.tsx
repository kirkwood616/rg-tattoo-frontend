import { User } from "firebase/auth";
import { ReactNode, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function toggleLoading() {
    setIsLoading((current) => !current);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
        toggleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
