import type { ChatSession } from "~/schema/session";

const fetchSessionById = async (id?: string) => {
  const response = await fetch(`/api/v1/sessions/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch session");
  }
  return response.json() as Promise<ChatSession>;
};

export const useSession = (id?: string) => {
  const [session, setSession] = useState<ChatSession | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await fetchSessionById(id!);
      setSession(sessionData);
    };

    if (!id) {
      setSession(null);
      return;
    }

    fetchSession();
  }, [id]);

  return session;
};

import { useEffect, useState } from "react";
