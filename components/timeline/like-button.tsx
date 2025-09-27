"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { togglePostLike } from "@/app/actions/posts";

type LikeButtonProps = {
  postId: string;
  initialLiked?: boolean;
  initialCount: number;
};

export function LikeButton({ postId, initialLiked = false, initialCount }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const icon = useMemo(() => (liked ? "❤️" : "🤍"), [liked]);

  const handleToggle = () => {
    if (isPending) return;

    startTransition(async () => {
      setError(null);
      const prevLiked = liked;
      const prevCount = count;
      const nextLiked = !liked;

      setLiked(nextLiked);
      setCount((value) => Math.max(0, value + (nextLiked ? 1 : -1)));

      const result = await togglePostLike(postId);

      if (!result.ok) {
        setLiked(prevLiked);
        setCount(prevCount);
        setError(
          result.error === "UNAUTHORIZED"
            ? "いいねにはログインが必要です"
            : "いいねの更新に失敗しました"
        );
        return;
      }

      setLiked(result.liked);
      setCount(result.likes);
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
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm transition ${
            liked ? "bg-rose-500/10 text-rose-400" : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
          } disabled:cursor-not-allowed disabled:opacity-60`}
        >
          <span aria-hidden>{icon}</span>
          <span>{count}</span>
        </button>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
          >
            <span aria-hidden>🤍</span>
            <span>{count}</span>
          </button>
        </SignInButton>
      </SignedOut>

      {error ? <span className="text-xs text-rose-400">{error}</span> : null}
    </div>
  );
}
