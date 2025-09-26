import { PostCard } from "@/components/timeline/post-card";
import type { BookmarkItem } from "@/types/social";

export function BookmarkList({ items }: { items: BookmarkItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center text-neutral-400">
        まだブックマークがありません。
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.id} className="rounded-3xl border border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center justify-between px-6 py-3 text-xs text-neutral-500">
            <span>保存日: {item.savedAt}</span>
            <button className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300 opacity-70" disabled>
              共有
            </button>
          </div>
          <PostCard post={item.post} />
        </div>
      ))}
    </div>
  );
}
