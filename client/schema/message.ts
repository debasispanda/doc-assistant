export interface ChatMessage {
  id: string;
  content: string;
  type: "user" | "assistant";
  sessionId: string;
  createdAt: string;
}
