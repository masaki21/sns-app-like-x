"use client";

import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useState, useTransition } from "react";

import { toggleFollow } from "@/app/actions/profile";

export function FollowButton({
  handle,
  isFollowing,
}: {
  handle: string;
  isFollowing?: boolean;
}) {
  const [following, setFollowing] = useState(Boolean(isFollowing));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      setError(null);
      const result = await toggleFollow(handle);
      if (!result.ok) {
        setError(
          result.error === "UNAUTHORIZED"
            ? "フォローにはサインインが必要です"
            : result.error === "CANNOT_FOLLOW_SELF"
            ? "自分自身をフォローすることはできません"
            : "フォロー操作に失敗しました"
        );
        return;
      }

      setFollowing(result.following);
      if (error) {
        setError(null);
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <SignedIn>
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`inline-flex w-full items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold transition sm:w-auto ${
            following
              ? "border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
              : "border-sky-500 text-sky-400 hover:bg-sky-500/10"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {following ? "フォロー中" : "フォローする"}
        </button>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="inline-flex w-full items-center justify-center rounded-full border border-sky-500 px-5 py-2 text-sm font-semibold text-sky-400 transition hover:bg-sky-500/10 sm:w-auto">
            フォローする
          </button>
        </SignInButton>
      </SignedOut>

      {error ? <span className="text-xs text-rose-400">{error}</span> : null}
    </div>
  );
}
