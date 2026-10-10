import type { Route } from "./+types/home";
import { ChatBox } from "~/components/ChatBox";
import { SessionContext } from "~/context/SessionContext";
import { useMemo } from "react";
import { useSession } from "~/hooks/useSession";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Doc Assistant" },
    { name: "description", content: "Welcome to Doc Assistant!" },
  ];
}

export default function Home({ params }: { params: { sessionId?: string } }) {
  const { session } = useSession(params.sessionId);

  const sessionValue = useMemo(() => {
    if (session) {
      return { session };
    }
    return { session: null };
  }, [session]);

  return (
    <SessionContext value={sessionValue}>
      <ChatBox />
    </SessionContext>
  );
}
