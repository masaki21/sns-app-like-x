"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { Avatar } from "@/components/user/avatar";
import type { ProfileSummary } from "@/types/social";
import { FollowButton } from "@/components/profile/follow-button";

export function ProfileHeader({ profile }: { profile: ProfileSummary }) {
  const { user } = useUser();
  const isOwner = user?.id === profile.id;

  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60">
      <div className="relative h-36 bg-gradient-to-r from-sky-600/60 via-purple-600/40 to-emerald-500/30" aria-hidden>
        <div className="absolute inset-0 bg-[length:20px_20px] bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)]" />
      </div>
      <div className="-mt-14 flex flex-col gap-5 px-4 pb-6 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="rounded-full border-4 border-neutral-950 shadow-lg shadow-sky-950/30">
            <Avatar
              name={profile.name}
              size="md"
              src={profile.avatarUrl}
              className="h-24 w-24 text-2xl md:h-28 md:w-28 md:text-3xl"
            />
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {isOwner ? (
              <Link
                href={`/profile/${profile.handle}/edit`}
                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-600 px-5 py-2 text-sm font-semibold text-neutral-100 transition hover:border-sky-500 hover:text-sky-400 sm:w-auto"
              >
                プロフィールを編集
              </Link>
            ) : (
              <FollowButton
                handle={profile.handle}
                isFollowing={profile.isFollowing}
              />
            )}
            <SignedIn>
              <UserButton afterSignOutUrl="/" userProfileMode="modal" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="inline-flex w-full items-center justify-center rounded-full border border-sky-500 px-5 py-2 text-sm font-semibold text-sky-400 transition hover:bg-sky-500/10 sm:w-auto">
                  サインイン
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">{profile.name}</h1>
          <p className="text-sm text-neutral-500">@{profile.handle}</p>
        </header>
        {profile.bio ? (
          <p className="text-sm text-neutral-100 sm:text-base">{profile.bio}</p>
        ) : null}
        <ul className="flex flex-wrap gap-4 text-xs text-neutral-500 sm:text-sm">
          {profile.location ? (
            <li className="flex items-center gap-2">
              <span aria-hidden>📍</span>
              <span>{profile.location}</span>
            </li>
          ) : null}
          {profile.website ? (
            <li className="flex items-center gap-2">
              <span aria-hidden>🔗</span>
              <a
                className="text-sky-400 transition hover:text-sky-300"
                href={profile.website}
                target="_blank"
                rel="noreferrer"
              >
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            </li>
          ) : null}
          <li className="flex items-center gap-2">
            <span aria-hidden>🗓️</span>
            <span>{profile.joinedAt} 参加</span>
          </li>
        </ul>
        <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
          <Stat label="投稿" value={profile.stats.posts} />
          <Stat label="フォロワー" value={profile.stats.followers} />
          <Stat label="フォロー中" value={profile.stats.following} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span>
      <strong className="text-neutral-100">{value.toLocaleString("ja-JP")}</strong> {label}
    </span>
  );
}
