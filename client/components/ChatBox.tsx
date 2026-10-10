import { SessionNav } from "~/components/SessionNav";
import { ChatInput } from "~/components/ChatInput";
import { MessageBox } from "~/components/MessageBox";
import { useSessionActions } from "~/hooks/useSessionActions";
import { useSessionContext } from "~/context/SessionContext";
import { useNavigate } from "react-router";

export const ChatBox = () => {
  const { session } = useSessionContext();
  const { createSession } = useSessionActions();
  const navigate = useNavigate();

  const handleOnMessageSend = async (message: string) => {
    if (!session) {
      console.log("No active session");
      const res = await createSession();
      navigate(`/${res.id}`);
      return;
    }
    console.log("Session: ", session);
  };

  return (
    <div className="flex">
      <SessionNav />
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        <div className="flex-1 flex overflow-y-auto mb-4">
          <MessageBox />
        </div>
        <div className="border border-gray-300 rounded p-4">
          <ChatInput onSend={handleOnMessageSend} />
        </div>
      </div>
    </div>
  );
};
