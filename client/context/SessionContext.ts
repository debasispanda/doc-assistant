import React from "react";
import type { ChatSession } from "~/schema/session";

export const SessionContext = React.createContext<{
  session: ChatSession | null;
}>({
  session: null,
});

export const useSessionContext = () => React.useContext(SessionContext);
