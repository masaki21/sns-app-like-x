import { Sidebar } from "@/components/navigation/sidebar";
import { TrendList } from "@/components/discovery/trend-list";
import { UserSuggestionList } from "@/components/suggestions/user-suggestion-list";
import { SearchResults } from "@/components/search/search-results";
import { getSearchData } from "@/lib/mock-data";
import { navItems } from "@/lib/navigation";

export default async function SearchPage() {
  const { results, trends, suggestions } = await getSearchData();

  return (
    <div className="min-h-screen bg-neutral-950 pb-20 text-neutral-100 md:pb-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-10 pt-4 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar
          brandLabel="sns-app"
          primaryActionLabel="投稿する"
          navItems={navItems}
        />

        <main className="min-h-screen flex-1 border-neutral-800 md:border-x">
          <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur md:px-6">
            <h1 className="text-xl font-semibold">話題を検索</h1>
          </header>
          <section className="border-b border-neutral-800 px-4 py-4 md:px-6">
            <form className="flex items-center gap-3">
              <input
                type="search"
                placeholder="キーワード、アカウント、トピックを検索"
                className="flex-1 rounded-full bg-neutral-900 px-5 py-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
              />
              <button
                type="button"
                className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white opacity-60"
              >
                検索
              </button>
            </form>
          </section>
          <div className="px-4 py-6 md:px-6">
            <SearchResults results={results} />
          </div>
        </main>

        <aside className="hidden w-80 flex-shrink-0 flex-col gap-6 lg:flex">
          <TrendList trends={trends} />
          <UserSuggestionList users={suggestions} />
        </aside>
      </div>
    </div>
  );
}
