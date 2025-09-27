import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils/time";
import { formatImpressions } from "@/lib/utils/metric";
import type { ProfileSummary, TimelinePost } from "@/types/social";

export async function getProfileFromDatabase(handle: string) {
  const { userId } = auth();

  const user = await prisma.user.findUnique({
    where: { handle },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const posts = await prisma.post.findMany({
    where: { author: { handle } },
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
  });

  let likedIds = new Set<string>();
  if (userId && posts.length > 0) {
    const liked = await prisma.postLike.findMany({
      where: {
        userId,
        postId: { in: posts.map((post) => post.id) },
      },
      select: { postId: true },
    });
    likedIds = new Set(liked.map((record) => record.postId));
  }

  const profile: ProfileSummary = {
    id: user.id,
    name: user.displayName,
    handle: user.handle,
    avatarUrl: user.profile?.avatarUrl ?? undefined,
    bio: user.profile?.bio ?? "",
    location: user.profile?.location ?? "",
    website: user.profile?.websiteUrl ?? "",
    joinedAt: new Intl.DateTimeFormat("ja", {
      year: "numeric",
      month: "long",
    }).format(user.createdAt),
    stats: {
      posts: user._count.posts,
      followers: user._count.followers,
      following: user._count.following,
    },
  };

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
    likedByMe: likedIds.has(post.id),
  }));

  let isFollowing = false;
  if (userId && userId !== user.id) {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followeeId: {
          followerId: userId,
          followeeId: user.id,
        },
      },
    });
    isFollowing = Boolean(follow);
  }

  return { profile: { ...profile, isFollowing }, posts: timelinePosts };
}
