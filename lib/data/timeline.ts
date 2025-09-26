import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils/time";
import { formatImpressions } from "@/lib/utils/metric";
import type {
  SuggestedUser,
  TimelinePost,
  TrendTopic,
} from "@/types/social";

export async function getTimelineFromDatabase() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 25,
  });

  const timelinePosts: TimelinePost[] = posts.map((post) => ({
    id: post.id,
    author: {
      name: post.author.displayName,
      handle: post.author.handle,
    },
    time: formatRelativeTime(post.createdAt),
    content: post.body,
    stats: {
      replies: post._count.replies ?? 0,
      reposts: 0,
      likes: post._count.likes ?? 0,
      impressions: formatImpressions(post._count.likes ?? 0),
    },
  }));

  const topUsers = await prisma.user.findMany({
    include: {
      profile: true,
      _count: {
        select: {
          followers: true,
          posts: true,
        },
      },
    },
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
    take: 6,
  });

  const suggestedUsers: SuggestedUser[] = topUsers.slice(0, 3).map((user) => ({
    name: user.displayName,
    handle: user.handle,
    bio: user.profile?.bio ?? undefined,
  }));

  const trends: TrendTopic[] = topUsers.slice(0, 3).map((user) => ({
    category: "注目のクリエイター",
    title: user.displayName,
    posts: `${user._count.posts} 件の投稿`,
  }));

  return {
    posts: timelinePosts,
    trends,
    suggestedUsers,
  };
}
