import { Sidebar } from "@/components/navigation/sidebar";
import { ListCollectionGrid } from "@/components/lists/list-collection-card";
import { TrendList } from "@/components/discovery/trend-list";
import { UserSuggestionList } from "@/components/suggestions/user-suggestion-list";
import { getLists, getTimelineData } from "@/lib/mock-data";
import { navItems } from "@/lib/navigation";

export default async function ListsPage() {
  const [lists, { trends, suggestedUsers }] = await Promise.all([
    getLists(),
    getTimelineData(),
  ]);

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
            <h1 className="text-xl font-semibold">リスト</h1>
            <p className="text-sm text-neutral-500">キュレーションしたタイムラインを管理</p>
          </header>
          <div className="px-4 py-6 md:px-6">
            <ListCollectionGrid lists={lists} />
          </div>
        </main>

        <aside className="hidden w-80 flex-shrink-0 flex-col gap-6 lg:flex">
          <TrendList trends={trends} />
          <UserSuggestionList users={suggestedUsers} />
        </aside>
      </div>
    </div>
  );
}
