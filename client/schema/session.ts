import type { ChatMessage } from "./message";

export interface ChatSession {
  id: string;
  title?: string;
  messages?: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
