import { Avatar } from "@/components/user/avatar";
import type { SuggestedUser } from "@/types/social";

export function UserSuggestionList({ users }: { users: SuggestedUser[] }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h2 className="text-xl font-semibold">おすすめユーザー</h2>
      <div className="mt-4 flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.handle} className="flex items-center justify-between gap-3">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-neutral-100">{user.name}</p>
              <p className="text-xs text-neutral-500">@{user.handle}</p>
            </div>
            <button className="rounded-full border border-neutral-700 px-4 py-1 text-sm font-semibold text-neutral-100 transition hover:border-sky-500 hover:text-sky-400">
              フォロー
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
