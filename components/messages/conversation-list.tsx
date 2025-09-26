import type { MessagePreview } from "@/types/social";

export function ConversationList({ previews }: { previews: MessagePreview[] }) {
  return (
    <div className="w-full flex-shrink-0 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 lg:max-w-xs lg:flex-shrink-0">
      <h2 className="px-4 py-4 text-lg font-semibold sm:px-6">メッセージ</h2>
      <div className="divide-y divide-neutral-800">
        {previews.map((preview) => (
          <button
            key={preview.id}
            className="flex w-full flex-col gap-1 px-4 py-4 text-left transition hover:bg-neutral-900 sm:px-6"
          >
            <span className="text-sm font-semibold text-neutral-200">
              {preview.participants.map((p) => p.name).join(", ")}
            </span>
            <span className="text-xs text-neutral-500">
              {preview.lastMessage.author.name} · {preview.lastMessage.time} 前
            </span>
            <p className="text-sm text-neutral-400 line-clamp-2">
              {preview.lastMessage.content}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
