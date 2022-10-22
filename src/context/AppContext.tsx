import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

interface ContextModel {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  toggleLoading: () => void;
}

const defaultValue: ContextModel = {
  user: null,
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
  toggleLoading: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
