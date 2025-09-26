import { PostCard } from "@/components/timeline/post-card";
import type { TimelinePost } from "@/types/social";

export type PostListProps = {
  posts: TimelinePost[];
  withLink?: boolean;
};

export function PostList({ posts, withLink = true }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="px-6 py-8 text-sm text-neutral-500">
        まだ投稿はありません。
      </p>
    );
  }

  return (
    <section>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} withLink={withLink} />
      ))}
    </section>
  );
}
