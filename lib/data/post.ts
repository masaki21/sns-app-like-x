import { prisma } from "@/lib/prisma";
import { formatRelativeTime } from "@/lib/utils/time";
import { formatImpressions } from "@/lib/utils/metric";
import type { TimelinePost } from "@/types/social";

export type PostWithReplies = {
  post: TimelinePost;
  replies: TimelinePost[];
};

export async function getPostWithRepliesFromDatabase(
  id: string,
): Promise<PostWithReplies | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
      replies: {
        include: {
          author: true,
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) {
    return null;
  }

  const parent: TimelinePost = {
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
  };

  const replies: TimelinePost[] = post.replies.map((reply) => ({
    id: reply.id,
    author: {
      name: reply.author.displayName,
      handle: reply.author.handle,
    },
    time: formatRelativeTime(reply.createdAt),
    content: reply.body,
    stats: {
      replies: reply._count.replies ?? 0,
      reposts: 0,
      likes: reply._count.likes ?? 0,
      impressions: formatImpressions(reply._count.likes ?? 0),
    },
  }));

  return { post: parent, replies };
}
