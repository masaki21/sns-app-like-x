import type { SearchResult } from "@/types/social";

export function SearchResults({ results }: { results: SearchResult[] }) {
  if (results.length === 0) {
    return (
      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 text-center text-neutral-400">
        検索結果がありません。別のキーワードを試してください。
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-neutral-800 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      {results.map((result) => (
        <article key={result.id} className="px-6 py-5">
          <header className="flex items-center gap-3 text-sm text-neutral-500">
            <span className="uppercase tracking-wide">{result.type}</span>
            {result.badge ? (
              <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400">
                {result.badge}
              </span>
            ) : null}
          </header>
          <h2 className="mt-1 text-lg font-semibold text-neutral-100">{result.title}</h2>
          <p className="mt-2 text-sm text-neutral-400">{result.description}</p>
        </article>
      ))}
    </div>
  );
}
