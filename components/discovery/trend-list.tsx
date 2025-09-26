import type { TrendTopic } from "@/types/social";

export function TrendList({ trends }: { trends: TrendTopic[] }) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-5">
      <h2 className="text-xl font-semibold">いまどうなってる？</h2>
      <div className="mt-4 flex flex-col gap-4">
        {trends.map((trend) => (
          <div key={trend.title}>
            <p className="text-xs uppercase text-neutral-500">{trend.category}</p>
            <p className="text-sm font-semibold text-neutral-100">{trend.title}</p>
            <p className="text-xs text-neutral-500">{trend.posts}件の投稿</p>
          </div>
        ))}
      </div>
    </div>
  );
}
