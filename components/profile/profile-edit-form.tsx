"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { updateProfile } from "@/app/actions/profile";
import { Avatar } from "@/components/user/avatar";
import type { ProfileSummary } from "@/types/social";

export function ProfileEditForm({ profile }: { profile: ProfileSummary }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setAvatarPreview(profile.avatarUrl ?? "");
  }, [profile.avatarUrl]);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      setError(null);
      const result = await updateProfile(formData);

      if (!result.ok) {
        switch (result.error) {
          case "UNAUTHORIZED":
            setError("ログインが必要です。");
            break;
          case "FORBIDDEN":
            setError("このプロフィールを編集する権限がありません。");
            break;
          case "DISPLAY_NAME_REQUIRED":
            setError("表示名を入力してください。");
            break;
          default:
            setError("更新に失敗しました。時間をおいて再度お試しください。");
        }
        return;
      }

      router.replace(`/profile/${result.handle}`);
      router.refresh();
    });
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="mt-6 space-y-6"
    >
      <input type="hidden" name="profileId" value={profile.id} />
      <input type="hidden" name="handle" value={profile.handle} />

      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Avatar name={profile.name} size="lg" src={avatarPreview} className="h-24 w-24" />
        <div className="flex-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            アバター画像URL
          </label>
          <input
            name="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.png"
            defaultValue={profile.avatarUrl ?? ""}
            onChange={(event) => setAvatarPreview(event.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-sky-500"
          />
          <p className="mt-1 text-xs text-neutral-500">
            画像URLを指定するとプロフィール画像が更新されます。
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            表示名
          </label>
          <input
            name="displayName"
            defaultValue={profile.name}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-sky-500"
            placeholder="表示名"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            位置情報
          </label>
          <input
            name="location"
            defaultValue={profile.location}
            className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-sky-500"
            placeholder="Tokyo, Japan"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          ウェブサイト
        </label>
        <input
          name="website"
          type="url"
          defaultValue={profile.website}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-sky-500"
          placeholder="https://example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          自己紹介
        </label>
        <textarea
          name="bio"
          defaultValue={profile.bio}
          rows={4}
          className="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-sky-500"
          placeholder="あなたについて教えてください"
        />
      </div>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "更新中..." : "変更を保存"}
        </button>
      </div>
    </form>
  );
}
