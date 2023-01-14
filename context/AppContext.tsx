import { createContext, Dispatch, SetStateAction } from "react";

interface ContextModel {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  toggleModalOpen: (setIsActive?: Dispatch<SetStateAction<boolean>>) => void;
  toggleLoading: () => void;
}

const defaultValue: ContextModel = {
  isLoading: false,
  setIsLoading: () => {},
  isModalOpen: false,
  toggleModalOpen: () => {},
  toggleLoading: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
