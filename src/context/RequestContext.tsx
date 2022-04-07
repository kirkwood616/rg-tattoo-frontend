import { createContext } from "react";

interface RequestContextModel {
  startDate: Date | null;
}

const defaultValue: RequestContextModel = {
  startDate: null,
};

const RequestContext = createContext(defaultValue);

export default RequestContext;
