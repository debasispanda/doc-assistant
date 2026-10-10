import { useEffect, useState } from "react";
import type { ChatSession } from "~/schema/session";

const fetchSessions = async () => {
  const response = await fetch("/api/v1/sessions");
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  return response.json() as Promise<ChatSession[]>;
};

export const useSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    fetchSessions().then((data) => {
      setSessions(data);
    });
  }, []);

  return sessions;
};
