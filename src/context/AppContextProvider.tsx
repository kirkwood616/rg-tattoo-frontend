import { User } from "firebase/auth";
import { ReactNode, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
