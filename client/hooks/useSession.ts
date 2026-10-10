import { useEffect, useState } from "react";
import { fetchApi } from "~/hooks/fetchApi";
import type { ChatSession } from "~/schema/session";

export const useSession = (id?: string) => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setSession(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setSession(null);
    setLoading(true);
    setError(null);

    fetchApi<ChatSession>(`/api/v1/sessions/${id}`, {
      signal: controller.signal,
    })
      .then(setSession)
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

  return { session, loading, error };
};
