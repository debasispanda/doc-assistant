import { SendHorizonal } from "lucide-react";
import { AttachmentMenu } from "./AttachmentMenu";

export const ChatInput = ({
  onSend,
}: {
  onSend: (message: string) => void;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const message = (
          e.currentTarget.elements.namedItem("chat") as HTMLTextAreaElement
        ).value;
        onSend(message);
        (
          e.currentTarget.elements.namedItem("chat") as HTMLTextAreaElement
        ).value = "";
      }}
    >
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center px-3 py-2 rounded-base bg-neutral-secondary-soft">
        <AttachmentMenu />
        <textarea
          id="chat"
          rows={1}
          className="mx-4 bg-neutral-primary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body"
          placeholder="Your message..."
        ></textarea>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-fg-brand rounded-full cursor-pointer hover:bg-brand-softer"
        >
          <SendHorizonal />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
};
