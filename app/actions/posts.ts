"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PostVisibility } from "@prisma/client";

import { prisma } from "@/lib/prisma";

function sanitizeHandle(value: string) {
  return value.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
}

function resolveHandle(user: NonNullable<Awaited<ReturnType<typeof currentUser>>>) {
  const emailHandle = user.primaryEmailAddress?.emailAddress
    ? user.primaryEmailAddress.emailAddress.split("@")[0]
    : undefined;
  const raw = user.username ?? emailHandle ?? `user_${user.id.slice(-6)}`;
  return sanitizeHandle(raw);
}

function resolveDisplayName(user: NonNullable<Awaited<ReturnType<typeof currentUser>>>) {
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  if (fullName.length > 0) return fullName;
  return user.username ?? user.primaryEmailAddress?.emailAddress ?? resolveHandle(user);
}

export async function createPost(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "UNAUTHORIZED" as const };
  }

  const content = String(formData.get("content") ?? "").trim();

  if (!content) {
    return { ok: false, error: "EMPTY_CONTENT" as const };
  }

  let author = await prisma.user.findUnique({
    where: { id: user.id },
    select: { handle: true },
  });

  if (!author) {
    const handle = resolveHandle(user);
    const displayName = resolveDisplayName(user);

    author = await prisma.user.create({
      data: {
        id: user.id,
        handle,
        displayName,
        isVerified: (user.publicMetadata as Record<string, unknown>)?.isVerified === true,
        profile: {
          create: {
            bio: (user.publicMetadata as Record<string, unknown>)?.bio as string | undefined,
            avatarUrl: user.imageUrl ?? undefined,
            location: (user.publicMetadata as Record<string, unknown>)?.location as
              | string
              | undefined,
            websiteUrl: (user.publicMetadata as Record<string, unknown>)?.website as
              | string
              | undefined,
          },
        },
      },
      select: { handle: true },
    });
  }

  await prisma.post.create({
    data: {
      body: content,
      userId: user.id,
      visibility: PostVisibility.PUBLIC,
    },
  });

  return { ok: true as const, authorHandle: author.handle };
}

export async function togglePostLike(postId: string) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "UNAUTHORIZED" as const };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { author: { select: { handle: true } } },
  });

  if (!post) {
    return { ok: false, error: "POST_NOT_FOUND" as const };
  }

  const existing = await prisma.postLike.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
  });

  let liked = false;

  if (existing) {
    await prisma.postLike.delete({
      where: { userId_postId: { userId: user.id, postId } },
    });
  } else {
    await prisma.postLike.create({
      data: {
        userId: user.id,
        postId,
      },
    });
    liked = true;
  }

  const likes = await prisma.postLike.count({ where: { postId } });

  return {
    ok: true as const,
    liked,
    likes,
    profileHandle: post.author?.handle ?? null,
  };
}
