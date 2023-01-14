import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import AppContext from "./AppContext";

interface Props {
  children: ReactNode;
}

export default function AppContextProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function toggleModalOpen(setIsActive?: Dispatch<SetStateAction<boolean>>): void {
    if (setIsActive) setIsActive((current) => !current);
    setIsModalOpen((current) => !current);
  }

  function toggleLoading(): void {
    setIsLoading((current) => !current);
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
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
