import { fetchApi } from "~/hooks/fetchApi";
import type { ChatSession } from "~/schema/session";

export const useSessionActions = () => {
  const createSession = (message: string): Promise<ChatSession> =>
    fetchApi<ChatSession>("/api/v1/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: message }),
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
