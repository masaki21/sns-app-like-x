import { notFound } from "next/navigation";
import { TrendList } from "@/components/discovery/trend-list";
import { AppScaffold } from "@/components/layout/app-scaffold";
import { UserSuggestionList } from "@/components/suggestions/user-suggestion-list";
import { PostCard } from "@/components/timeline/post-card";
import { PostList } from "@/components/timeline/post-list";
import { withFallback } from "@/lib/data/fallback";
import { getPostWithRepliesFromDatabase } from "@/lib/data/post";
import { getTimelineFromDatabase } from "@/lib/data/timeline";
import {
  getPostWithRepliesFromMock,
  getTimelineData as getMockTimelineData,
} from "@/lib/mock-data";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const postData = await withFallback(
    () => getPostWithRepliesFromDatabase(params.id),
    () => getPostWithRepliesFromMock(params.id),
    (error) => console.error("Failed to load post detail from database", error),
  );

  if (!postData) {
    notFound();
  }

  const { trends, suggestedUsers } = await withFallback(
    () => getTimelineFromDatabase(),
    () => getMockTimelineData(),
  );

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
        <h1 className="text-xl font-semibold">ポスト</h1>
      </header>
      <section>
        <PostCard post={postData.post} withLink={false} />
      </section>
      <section className="px-4 py-4 md:px-6">
        <h2 className="text-sm font-semibold text-neutral-400">リプライ</h2>
      </section>
      <PostList posts={postData.replies} />
    </AppScaffold>
  );
}
