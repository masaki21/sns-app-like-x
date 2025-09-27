"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { createPost } from "@/app/actions/posts";
import { Avatar } from "@/components/user/avatar";

export function PostComposer() {
  const { user } = useUser();
  const displayName =
    user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "You";

  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      const result = await createPost(formData);

      if (result.ok) {
        formRef.current?.reset();
        router.refresh();
      } else {
        switch (result.error) {
          case "EMPTY_CONTENT":
            setError("投稿内容を入力してください。");
            break;
          case "UNAUTHORIZED":
            setError("投稿するにはログインが必要です。");
            break;
          default:
            setError("投稿に失敗しました。時間をおいて再度お試しください。");
        }
      }
    });
  };

  return (
    <section className="border-b border-neutral-800 px-4 pb-4 pt-3 md:px-6">
      <SignedIn>
        <form ref={formRef} className="flex flex-col gap-3 sm:flex-row" action={handleSubmit}>
          <div className="sm:pt-1">
            <Avatar
              name={displayName}
              size="sm"
              src={user?.imageUrl ?? undefined}
              className="md:h-12 md:w-12 md:text-base"
            />
          </div>
          <div className="flex-1">
            <textarea
              name="content"
              placeholder="いまどうしてる？"
              className="w-full resize-none rounded-lg bg-neutral-900 px-4 py-3 text-base text-neutral-100 outline-none placeholder:text-neutral-500"
              rows={3}
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-3 text-lg text-sky-500" aria-hidden>
                <span>🖼️</span>
                <span>🎥</span>
                <span>📊</span>
                <span>📍</span>
              </div>
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <button
                  type="submit"
                  className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isPending}
                >
                  {isPending ? "投稿中..." : "投稿する"}
                </button>
              </div>
            </div>
            {error ? <p className="mt-2 text-xs text-rose-400">{error}</p> : null}
          </div>
        </form>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 px-6 py-5 text-center">
          <p className="text-sm text-neutral-400">投稿するにはサインインしてください。</p>
          <SignInButton mode="modal" redirectUrl="/">
            <button className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
              サインイン
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </section>
  );
}
