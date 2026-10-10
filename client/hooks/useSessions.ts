import { useEffect, useState } from "react";
import { fetchApi } from "~/hooks/fetchApi";
import type { ChatSession } from "~/schema/session";

export const useSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchApi<ChatSession[]>("/api/v1/sessions", {
      signal: controller.signal,
    })
      .then(setSessions)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError
              : new Error("Failed to fetch sessions"),
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return { sessions, loading, error };
};
