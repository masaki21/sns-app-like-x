"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateProfile(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "UNAUTHORIZED" as const };
  }

  const profileId = String(formData.get("profileId") ?? "").trim();
  const handle = String(formData.get("handle") ?? "").trim().toLowerCase();

  if (!profileId || profileId !== user.id) {
    return { ok: false, error: "FORBIDDEN" as const };
  }

  const displayName = String(formData.get("displayName") ?? "").trim();
  if (!displayName) {
    return { ok: false, error: "DISPLAY_NAME_REQUIRED" as const };
  }

  const bio = String(formData.get("bio") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      displayName,
      profile: {
        upsert: {
          create: {
            bio: bio || null,
            location: location || null,
            websiteUrl: website || null,
            avatarUrl: avatarUrl || null,
          },
          update: {
            bio: bio || null,
            location: location || null,
            websiteUrl: website || null,
            avatarUrl: avatarUrl || null,
          },
        },
      },
    },
  });

  revalidatePath(`/profile/${handle}`);
  revalidatePath("/");

  return { ok: true as const, handle };
}

export async function toggleFollow(handle: string) {
  const user = await currentUser();

  if (!user) {
    return { ok: false, error: "UNAUTHORIZED" as const };
  }

  const target = await prisma.user.findUnique({
    where: { handle: handle.toLowerCase() },
    select: { id: true },
  });

  if (!target) {
    return { ok: false, error: "NOT_FOUND" as const };
  }

  if (target.id === user.id) {
    return { ok: false, error: "CANNOT_FOLLOW_SELF" as const };
  }

  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followeeId: {
        followerId: user.id,
        followeeId: target.id,
      },
    },
  });

  if (existing) {
    await prisma.follow.delete({
      where: {
        followerId_followeeId: {
          followerId: user.id,
          followeeId: target.id,
        },
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: user.id,
        followeeId: target.id,
      },
    });
  }

  const [followers, following] = await Promise.all([
    prisma.follow.count({ where: { followeeId: target.id } }),
    prisma.follow.count({ where: { followerId: user.id } }),
  ]);

  revalidatePath(`/profile/${handle}`);

  return {
    ok: true as const,
    following: !existing,
    stats: {
      followers,
      following,
    },
  };
}
