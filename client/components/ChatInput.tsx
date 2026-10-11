import { AttachmentMenu } from "./AttachmentMenu";
import { useState } from "react";

export const ChatInput = ({
  onSend,
}: {
  onSend: (message: string) => void;
}) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter is pressed WITHOUT the Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (adding a new line)

      if (value.trim() !== "") {
        onSend(value);
        setValue("");
      }
    }
  };

  return (
    <form className="border border-gray-300 rounded-2xl p-0">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-base bg-neutral-secondary-soft">
        <AttachmentMenu />
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="chat"
          rows={1}
          className="mx-4 bg-neutral-primary-medium text-heading text-sm rounded-base block w-full px-3 py-2.5 placeholder:text-body outline-0"
          placeholder="Your message..."
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </form>
  );
};
