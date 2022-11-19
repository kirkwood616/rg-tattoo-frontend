import { User } from "firebase/auth";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModalOpen(setIsActive?: Dispatch<SetStateAction<boolean>>) {
    if (setIsActive) setIsActive((current) => !current);
    setIsModalOpen((current) => !current);
  }

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
        isModalOpen,
        toggleModalOpen,
        toggleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
