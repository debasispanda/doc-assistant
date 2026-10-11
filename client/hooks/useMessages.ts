import { useState, useEffect } from "react";
import type { ChatMessage } from "~/schema/message";
import { fetchApi } from "./fetchApi";

export const useMessages = (id?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setMessages([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setMessages([]);
    setLoading(true);
    setError(null);

    fetchApi<ChatMessage[]>(`/api/v1/messages?session_id=${id}`, {
      signal: controller.signal,
    })
      .then(setMessages)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError
              : new Error("Failed to fetch session"),
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const eventSource = new EventSource(
      `/api/v1/messages/stream?session_id=${id}`,
    );

    eventSource.onmessage = (event) => {
      const newMessage: ChatMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  const createMessage = (
    message: string,
    sessionId?: string | undefined,
  ): Promise<ChatMessage> =>
    fetchApi<ChatMessage>("/api/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message, sessionId: sessionId || id }),
    });

  return {
    messages,
    setMessages,
    createMessage,
    loading,
    setLoading,
    error,
    setError,
  };
};
