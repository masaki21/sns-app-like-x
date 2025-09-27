import Link from "next/link";

import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { loadEditableProfile } from "@/lib/data/profile-edit";

export default async function ProfileEditModal({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;
  const profile = await loadEditableProfile(handle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-8 shadow-2xl">
        <Link
          href={`/profile/${handle}`}
          className="absolute right-4 top-4 text-xl text-neutral-500 transition hover:text-neutral-300"
          aria-label="閉じる"
        >
          ×
        </Link>
        <h1 className="text-2xl font-semibold text-neutral-100">プロフィールを編集</h1>
        <p className="mt-1 text-sm text-neutral-500">
          表示名や自己紹介、連絡先などのプロフィール情報を更新できます。
        </p>
        <ProfileEditForm profile={profile} />
      </div>
    </div>
  );
}
