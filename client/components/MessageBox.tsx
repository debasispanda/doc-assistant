import { useSessionContext } from "~/context/SessionContext";
import { useMessages } from "~/hooks/useMessages";

export const MessageBox = () => {
  const { session } = useSessionContext();
  const { messages } = useMessages(session?.id);

  if (!session || !messages || messages.length === 0) {
    return (
      <div className="p-4 flex flex-col text-gray-500 flex-1 items-center justify-center">
        Start a new session or open an existing one.
      </div>
    );
  }

  return (
    <div className="p-4 flex-1">
      {messages.map((message) => (
        <p
          key={message.id}
          className={`text-gray-700 p-4 mb-10 rounded-xl ${message.type === "user" ? "text-right bg-gray-100" : "text-left"}`}
        >
          {message.content}
        </p>
      ))}
    </div>
  );
};
