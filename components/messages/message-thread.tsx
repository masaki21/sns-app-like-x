import { Avatar } from "@/components/user/avatar";
import type { MessageThread } from "@/types/social";

export function MessageThreadView({ thread }: { thread: MessageThread }) {
  return (
    <div className="flex w-full flex-1 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      <div className="flex w-full flex-col">
        <header className="border-b border-neutral-800 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-semibold text-neutral-100">
            {thread.participants.map((p) => p.name).join(", ")}
          </h2>
          <p className="text-xs text-neutral-500">
            最後のメッセージ: {thread.lastMessage.time} 前
          </p>
        </header>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-6 max-h-[60vh]">
          {thread.messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar name={message.author.name} size="sm" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-neutral-200">
                    {message.author.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {message.time} 前
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-100">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <footer className="border-t border-neutral-800 px-4 py-4 sm:px-6">
          <form className="flex items-center gap-3">
            <input
              type="text"
              placeholder="メッセージを入力"
              className="flex-1 rounded-full bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
            />
            <button
              type="button"
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white opacity-60"
            >
              送信
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
