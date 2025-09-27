import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils/time";
import { formatImpressions } from "@/lib/utils/metric";
import type { SuggestedUser, TimelinePost, TrendTopic } from "@/types/social";

export async function getTimelineFromDatabase() {
  const { userId } = auth();

  const posts = await prisma.post.findMany({
    include: {
      author: { include: { profile: true } },
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

  let likedPostIds = new Set<string>();
  if (userId && posts.length > 0) {
    const likedRecords = await prisma.postLike.findMany({
      where: {
        userId,
        postId: { in: posts.map((post) => post.id) },
      },
      select: { postId: true },
    });
    likedPostIds = new Set(likedRecords.map((record) => record.postId));
  }

  const timelinePosts: TimelinePost[] = posts.map((post) => ({
    id: post.id,
    author: {
      name: post.author.displayName,
      handle: post.author.handle,
      avatarUrl: post.author.profile?.avatarUrl ?? undefined,
    },
    time: formatRelativeTime(post.createdAt),
    content: post.body,
    stats: {
      replies: post._count.replies ?? 0,
      reposts: 0,
      likes: post._count.likes ?? 0,
      impressions: formatImpressions(post._count.likes ?? 0),
    },
    likedByMe: likedPostIds.has(post.id),
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
