import { SessionNav } from "~/components/SessionNav";
import { ChatInput } from "~/components/ChatInput";
import { MessageBox } from "~/components/MessageBox";
import { useSessionActions } from "~/hooks/useSessionActions";
import { useSessionContext } from "~/context/SessionContext";
import { useMessages } from "~/hooks/useMessages";
import { useNavigate } from "react-router";

export const ChatBox = () => {
  let { session } = useSessionContext();
  const { createSession } = useSessionActions();
  const navigate = useNavigate();
  const { createMessage } = useMessages(session?.id);

  const handleOnMessageSend = async (message: string) => {
    if (!session) {
      console.log("No active session");
      session = await createSession(message);
      await createMessage(message, session?.id);
      navigate(`/${session.id}`);
      return;
    }
    console.log("Session: ", session);

    await createMessage(message);
  };

  return (
    <div className="flex">
      <SessionNav />
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">Chat Window</h2>
        <div className="flex-1 flex overflow-y-auto mb-4">
          <MessageBox />
        </div>
        <ChatInput onSend={handleOnMessageSend} />
      </div>
    </div>
  );
};
