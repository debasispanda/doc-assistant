import type { Route } from "./+types/home";
import { ChatBox } from "../components/ChatBox";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Doc Assistant" },
    { name: "description", content: "Welcome to Doc Assistant!" },
  ];
}

export default function Home({ params }: { params: { sessionId?: string } }) {
  return <ChatBox sessionId={params.sessionId} />;
}
