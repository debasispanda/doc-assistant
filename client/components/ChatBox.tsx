import { SessionNav } from "~/components/SessionNav";
import { ChatInput } from "~/components/ChatInput";
import { MessageBox } from "~/components/MessageBox";

export type Feature = {
  id: string;
  label: string;
  path: string;
};

export const features = [
  { id: "home", label: "Home", path: "/" },
  { id: "example", label: "Example", path: "/example" },
  { id: "tree", label: "Tree", path: "/tree" },
] satisfies Feature[];

export const ChatBox = ({ sessionId }: { sessionId?: string }) => {
  return (
    <div className="flex">
      <SessionNav />
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        <div className="flex-1 flex overflow-y-auto mb-4">
          <MessageBox sessionId={sessionId} />
        </div>
        <div className="border border-gray-300 rounded p-4">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
