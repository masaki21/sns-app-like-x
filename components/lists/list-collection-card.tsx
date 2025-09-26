import type { ListCollection } from "@/types/social";

export function ListCollectionGrid({ lists }: { lists: ListCollection[] }) {
  if (lists.length === 0) {
    return (
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center text-neutral-400">
        作成済みのリストはありません。
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {lists.map((list) => (
        <article
          key={list.id}
          className="flex h-full flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6"
        >
          <div>
            <p className="text-xs uppercase text-neutral-500">リスト</p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-100">
              {list.title}
            </h2>
            <p className="mt-3 text-sm text-neutral-400">{list.description}</p>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
            <span>{list.membersCount} 件のアカウント</span>
            <span>作成者: {list.creator.name}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
