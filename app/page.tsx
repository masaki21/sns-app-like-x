import { TrendList } from "@/components/discovery/trend-list";
import { AppScaffold } from "@/components/layout/app-scaffold";
import { UserSuggestionList } from "@/components/suggestions/user-suggestion-list";
import { PostComposer } from "@/components/timeline/post-composer";
import { PostList } from "@/components/timeline/post-list";
import { withFallback } from "@/lib/data/fallback";
import { getTimelineFromDatabase } from "@/lib/data/timeline";
import { getTimelineData as getMockTimelineData } from "@/lib/mock-data";
import type { SuggestedUser, TimelinePost, TrendTopic } from "@/types/social";

export default async function TimelinePage() {
  const { posts, trends, suggestedUsers } = await withFallback(
    () => getTimelineFromDatabase(),
    () => getMockTimelineData(),
    (error) =>
      console.error("Failed to load timeline from database, using mock data", error),
  );

  return (
    <Shell posts={posts} trends={trends} suggestedUsers={suggestedUsers} />
  );
}

type ShellProps = {
  posts: TimelinePost[];
  trends: TrendTopic[];
  suggestedUsers: SuggestedUser[];
};

function Shell({ posts, trends, suggestedUsers }: ShellProps) {
  return (
    <AppScaffold
      aside={
        <>
          <TrendList trends={trends} />
          <UserSuggestionList users={suggestedUsers} />
        </>
      }
    >
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur md:px-6">
        <h1 className="text-xl font-semibold">ホーム</h1>
        <p className="text-sm text-neutral-500">最新のプロジェクトアップデートをチェック</p>
      </header>
      <PostComposer />
      <PostList posts={posts} />
    </AppScaffold>
  );
}
