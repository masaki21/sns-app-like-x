import { Avatar } from "@/components/user/avatar";
import type { NotificationItem } from "@/types/social";

const iconMap: Record<NotificationItem["type"], string> = {
  follow: "➕",
  like: "❤️",
  reply: "💬",
  mention: "📣",
};

export function NotificationList({ items }: { items: NotificationItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center text-neutral-400">
        通知はまだありません。
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-neutral-800 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-lg">
            {iconMap[item.type]}
          </div>
          <div className="flex flex-1 items-start gap-4">
            <Avatar name={item.actor.name} size="sm" />
            <div className="flex-1">
              <p className="text-sm text-neutral-200">{item.message}</p>
              <p className="mt-1 text-xs text-neutral-500">{item.time} 前</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
