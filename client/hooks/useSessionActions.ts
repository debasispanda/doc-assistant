import { fetchApi } from "~/hooks/fetchApi";
import type { ChatSession } from "~/schema/session";

export const useSessionActions = () => {
  const createSession = (): Promise<ChatSession> =>
    fetchApi<ChatSession>("/api/v1/sessions", {
      method: "POST",
    });

  const deleteSession = (sessionId: string): Promise<void> =>
    fetchApi<void>(`/api/v1/sessions/${sessionId}`, {
      method: "DELETE",
    });

  return {
    createSession,
    deleteSession,
  };
};
