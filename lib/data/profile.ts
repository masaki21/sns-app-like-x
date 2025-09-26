import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils/time";
import { formatImpressions } from "@/lib/utils/metric";
import type { ProfileSummary, TimelinePost } from "@/types/social";

export async function getProfileFromDatabase(handle: string) {
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
      author: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const profile: ProfileSummary = {
    id: user.id,
    name: user.displayName,
    handle: user.handle,
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

  return { profile, posts: timelinePosts };
}
